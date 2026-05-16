# Інструкція з розгортання сайту на Hetzner (через GitHub)

Ця інструкція крок за кроком пояснює, як перенести код на сервер і запустити його. Вона передбачає, що сервер має "чисту" ОС Ubuntu (наприклад, Ubuntu 24.04 або 22.04).

## 1. Завантаження коду на GitHub
На вашому комп'ютері:
1. Відкрийте термінал у теці `attorney-site`
2. Ініціалізуйте Git, якщо ще цього не зробили:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for production"
   ```
3. Створіть приватний репозиторій на GitHub і дотримуйтесь їхніх інструкцій, щоб запушити код (команди `git remote add origin ...` та `git push`).

## 2. Підготовка сервера Hetzner
Підключіться до вашого сервера через SSH:
```bash
ssh root@ВАШ_IP_СЕРВЕРА
```

### 2.1 Оновлення системи та встановлення необхідних пакетів
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx build-essential
```

### 2.2 Встановлення Node.js (Версія 22.x LTS)
```bash
# Встановлюємо NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Перезавантажуємо середовище (або просто закрийте і відкрийте SSH знову)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Встановлюємо Node 22
nvm install 22
nvm use 22

# Перевіряємо (має показати v22.x.x)
node -v
```

### 2.3 Встановлення PM2 (Менеджер процесів)
```bash
npm install -g pm2
```

## 3. Клонування та збірка проєкту
Перейдемо у теку `/var/www`, де зазвичай лежать веб-сайти.
```bash
sudo mkdir -p /var/www
# Надаємо права поточному користувачу (наприклад, root або ubuntu)
sudo chown -R $USER:$USER /var/www
cd /var/www

# Клонуємо репозиторій (замініть URL на ваш)
git clone https://github.com/ВАШ_ЛОГІН/ВАШ_РЕПОЗИТОРІЙ.git attorney-site
cd attorney-site
```

### 3.1 Збірка Бекенду
```bash
cd backend
# Встановлюємо залежності
npm install

# Створюємо файл змінних середовища (.env)
cp .env.example .env
# Обов'язково відредагуйте JWT_SECRET в .env для безпеки (використовуйте nano .env)

# Генеруємо клієнт бази даних та виконуємо міграцію
npx prisma generate
npx prisma db push
npx prisma db seed

# Збираємо бекенд
npm run build
cd ..
```

### 3.2 Збірка Фронтенду
```bash
cd frontend
npm install
npm run build
cd ..
```

## 4. Запуск через PM2
Переконайтеся, що ви знаходитесь у кореневій папці `attorney-site`.
```bash
# Запускаємо процеси з нашого конфігу
pm2 start ecosystem.config.cjs

# Зберігаємо список процесів для автозапуску при рестарті сервера
pm2 save
pm2 startup
# Команда pm2 startup видасть команду, яку треба скопіювати і виконати
```
Перевірити, чи все працює: `pm2 status` та `pm2 logs`.

## 5. Налаштування Nginx
Ми вже підготували конфігурацію, тепер її треба підключити.
```bash
# Копіюємо наш файл у директорію Nginx
sudo cp nginx.conf.template /etc/nginx/sites-available/attorney-site

# УВАГА: Якщо у вас ВЖЕ працюють інші сайти на цьому сервері через Nginx, 
# НЕ ВИДАЛЯЙТЕ default і не використовуйте `server_name _;` у конфізі. 
# Краще дочекайтеся домену і відредагуйте nginx.conf.template, вказавши `server_name вашдомен;`
# Якщо ж це єдиний сайт (крім ботів, які не використовують Nginx), тоді виконуємо:
sudo rm /etc/nginx/sites-enabled/default || true

# Активуємо наш сайт
sudo ln -s /etc/nginx/sites-available/attorney-site /etc/nginx/sites-enabled/

# Перевіряємо конфігурацію на помилки
sudo nginx -t

# Перезавантажуємо Nginx
sudo systemctl restart nginx
```

🎉 **Готово!** Тепер ви можете відкрити IP вашого сервера в браузері `http://ВАШ_IP_СЕРВЕРА/` і побачити готовий сайт!

## 6. (Майбутнє) Підключення домену і безкоштовного HTTPS
Коли ви купите домен і направите його A-запис на IP вашого сервера:
1. Змініть `server_name _;` на `server_name вашдомен.com;` у файлі `/etc/nginx/sites-available/attorney-site`.
2. Перезавантажте Nginx: `sudo systemctl restart nginx`.
3. Встановіть SSL-сертифікат за допомогою Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d вашдомен.com
```
Certbot сам налаштує HTTPS і перенаправлення!
