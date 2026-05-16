// i18n translations for Ukrainian and English
const translations: Record<string, Record<string, string>> = {
  uk: {
    // Navigation
    'nav.home': 'Головна',
    'nav.services': 'Послуги',
    'nav.about': 'Про адвоката',
    'nav.appointment': 'Запис на прийом',
    'nav.contacts': 'Контакти',
    'nav.login': 'Увійти',
    'nav.dashboard': 'Кабінет',
    'nav.logout': 'Вийти',

    // Hero
    'hero.title': 'Ваш надійний адвокат',
    'hero.subtitle': 'Професійний юридичний захист ваших прав та інтересів. Індивідуальний підхід до кожної справи.',
    'hero.cta': 'Записатися на консультацію',
    'hero.cta2': 'Дізнатися більше',
    'hero.experience': 'Років досвіду',
    'hero.cases': 'Виграних справ',
    'hero.clients': 'Задоволених клієнтів',

    // Services
    'services.title': 'Юридичні послуги',
    'services.subtitle': 'Повний спектр правової допомоги для захисту ваших інтересів',
    'services.criminal': 'Кримінальне право',
    'services.criminal.desc': 'Захист у кримінальних справах на всіх етапах — від досудового розслідування до касації.',
    'services.civil': 'Цивільне право',
    'services.civil.desc': 'Вирішення майнових спорів, договірні відносини, захист прав споживачів.',
    'services.family': 'Сімейне право',
    'services.family.desc': 'Розлучення, поділ майна, аліменти, визначення місця проживання дитини.',
    'services.business': 'Господарське право',
    'services.business.desc': 'Супровід бізнесу, корпоративні спори, банкрутство, захист інтелектуальної власності.',
    'services.realestate': 'Нерухомість',
    'services.realestate.desc': 'Перевірка та супровід угод з нерухомістю, земельні спори, легалізація.',
    'services.consultation': 'Консультації',
    'services.consultation.desc': 'Первинна юридична консультація, аналіз документів, правовий висновок.',

    // About
    'about.title': 'Про адвоката',
    'about.name': 'Меркович Богдан Валерійович',
    'about.description': 'Адвокат з багаторічним досвідом у сфері юридичного захисту. Спеціалізується на складних кримінальних та цивільних справах. Член Національної асоціації адвокатів України.',
    'about.education': 'Освіта',
    'about.education.text': 'Юридичний факультет, магістр права',
    'about.license': 'Свідоцтво',
    'about.license.text': 'Свідоцтво про право на заняття адвокатською діяльністю',

    // Appointment
    'appointment.title': 'Запис на консультацію',
    'appointment.subtitle': 'Оберіть зручну дату та час для вашої консультації',
    'appointment.date': 'Оберіть дату',
    'appointment.time': 'Оберіть час',
    'appointment.service': 'Тип послуги',
    'appointment.name': 'Ваше повне ім\'я',
    'appointment.phone': 'Номер телефону',
    'appointment.email': 'Email (необов\'язково)',
    'appointment.notes': 'Опишіть вашу ситуацію',
    'appointment.submit': 'Записатися',
    'appointment.success': 'Ваш запис успішно створено! Ми зв\'яжемося з вами для підтвердження.',
    'appointment.noSlots': 'На цю дату немає вільних слотів',
    'appointment.dayOff': 'Вихідний день',
    'appointment.blocked': 'Цей день недоступний для запису',
    'appointment.selectService': 'Оберіть послугу',

    // Contact
    'contact.title': 'Контакти',
    'contact.address': 'Адреса',
    'contact.address.text': 'м. Київ, вул. Хрещатик, 1, офіс 305',
    'contact.phone': 'Телефон',
    'contact.email': 'Електронна пошта',
    'contact.schedule': 'Графік роботи',
    'contact.schedule.weekdays': 'Пн-Пт: 09:00 - 18:00',
    'contact.schedule.saturday': 'Сб: 10:00 - 14:00',
    'contact.schedule.sunday': 'Нд: Вихідний',

    // Auth
    'auth.login': 'Вхід',
    'auth.register': 'Реєстрація',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.fullName': 'Повне ім\'я',
    'auth.phone': 'Телефон',
    'auth.loginBtn': 'Увійти',
    'auth.registerBtn': 'Зареєструватися',
    'auth.noAccount': 'Немає акаунту?',
    'auth.hasAccount': 'Вже є акаунт?',

    // Dashboard
    'dashboard.title': 'Особистий кабінет',
    'dashboard.welcome': 'Ласкаво просимо',
    'dashboard.appointments': 'Мої записи',
    'dashboard.documents': 'Мої документи',
    'dashboard.noAppointments': 'У вас ще немає записів',
    'dashboard.noDocuments': 'У вас ще немає документів',
    'dashboard.newAppointment': 'Новий запис',
    'dashboard.uploadDocument': 'Завантажити документ',
    'dashboard.cancel': 'Скасувати',
    'dashboard.download': 'Завантажити',
    'dashboard.delete': 'Видалити',

    // Admin
    'admin.title': 'Панель адміністратора',
    'admin.appointments': 'Записи',
    'admin.clients': 'Клієнти',
    'admin.schedule': 'Розклад',
    'admin.stats': 'Статистика',
    'admin.blockedDates': 'Заблоковані дати',
    'admin.confirm': 'Підтвердити',
    'admin.complete': 'Завершити',
    'admin.totalClients': 'Всього клієнтів',
    'admin.totalAppointments': 'Всього записів',
    'admin.pending': 'Очікують',
    'admin.confirmed': 'Підтверджені',

    // Common
    'common.loading': 'Завантаження...',
    'common.error': 'Сталася помилка',
    'common.save': 'Зберегти',
    'common.cancel': 'Скасувати',
    'common.close': 'Закрити',
    'common.back': 'Назад',
    'common.status': 'Статус',
    'common.date': 'Дата',
    'common.time': 'Час',
    'common.actions': 'Дії',

    // Footer
    'footer.rights': '© 2026 Адвокат Меркович Б.В. Всі права захищено.',
    'footer.privacy': 'Політика конфіденційності',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.appointment': 'Book Appointment',
    'nav.contacts': 'Contacts',
    'nav.login': 'Sign In',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Sign Out',

    'hero.title': 'Your Trusted Attorney',
    'hero.subtitle': 'Professional legal protection of your rights and interests. Individual approach to every case.',
    'hero.cta': 'Book a Consultation',
    'hero.cta2': 'Learn More',
    'hero.experience': 'Years of Experience',
    'hero.cases': 'Cases Won',
    'hero.clients': 'Satisfied Clients',

    'services.title': 'Legal Services',
    'services.subtitle': 'Full range of legal assistance to protect your interests',
    'services.criminal': 'Criminal Law',
    'services.criminal.desc': 'Defense in criminal cases at all stages — from pre-trial investigation to cassation.',
    'services.civil': 'Civil Law',
    'services.civil.desc': 'Property disputes resolution, contractual relations, consumer rights protection.',
    'services.family': 'Family Law',
    'services.family.desc': 'Divorce, property division, alimony, child custody determination.',
    'services.business': 'Business Law',
    'services.business.desc': 'Business support, corporate disputes, bankruptcy, intellectual property protection.',
    'services.realestate': 'Real Estate',
    'services.realestate.desc': 'Verification and support of real estate transactions, land disputes, legalization.',
    'services.consultation': 'Consultations',
    'services.consultation.desc': 'Initial legal consultation, document analysis, legal opinion.',

    'about.title': 'About the Attorney',
    'about.name': 'Merkovich Bogdan Valeriyovych',
    'about.description': 'An attorney with many years of experience in legal defense. Specializes in complex criminal and civil cases. Member of the Ukrainian National Bar Association.',
    'about.education': 'Education',
    'about.education.text': 'Law Faculty, Master of Law',
    'about.license': 'License',
    'about.license.text': 'Certificate of the right to practice law',

    'appointment.title': 'Book a Consultation',
    'appointment.subtitle': 'Choose a convenient date and time for your consultation',
    'appointment.date': 'Select Date',
    'appointment.time': 'Select Time',
    'appointment.service': 'Service Type',
    'appointment.name': 'Your Full Name',
    'appointment.phone': 'Phone Number',
    'appointment.email': 'Email (optional)',
    'appointment.notes': 'Describe your situation',
    'appointment.submit': 'Book Now',
    'appointment.success': 'Your appointment has been booked! We will contact you for confirmation.',
    'appointment.noSlots': 'No available slots for this date',
    'appointment.dayOff': 'Day off',
    'appointment.blocked': 'This date is unavailable',
    'appointment.selectService': 'Select a service',

    'contact.title': 'Contacts',
    'contact.address': 'Address',
    'contact.address.text': 'Kyiv, 1 Khreshchatyk St., Office 305',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.schedule': 'Working Hours',
    'contact.schedule.weekdays': 'Mon-Fri: 09:00 - 18:00',
    'contact.schedule.saturday': 'Sat: 10:00 - 14:00',
    'contact.schedule.sunday': 'Sun: Closed',

    'auth.login': 'Sign In',
    'auth.register': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.phone': 'Phone',
    'auth.loginBtn': 'Sign In',
    'auth.registerBtn': 'Sign Up',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',

    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.appointments': 'My Appointments',
    'dashboard.documents': 'My Documents',
    'dashboard.noAppointments': 'You have no appointments yet',
    'dashboard.noDocuments': 'You have no documents yet',
    'dashboard.newAppointment': 'New Appointment',
    'dashboard.uploadDocument': 'Upload Document',
    'dashboard.cancel': 'Cancel',
    'dashboard.download': 'Download',
    'dashboard.delete': 'Delete',

    'admin.title': 'Admin Panel',
    'admin.appointments': 'Appointments',
    'admin.clients': 'Clients',
    'admin.schedule': 'Schedule',
    'admin.stats': 'Statistics',
    'admin.blockedDates': 'Blocked Dates',
    'admin.confirm': 'Confirm',
    'admin.complete': 'Complete',
    'admin.totalClients': 'Total Clients',
    'admin.totalAppointments': 'Total Appointments',
    'admin.pending': 'Pending',
    'admin.confirmed': 'Confirmed',

    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.actions': 'Actions',

    'footer.rights': '© 2026 Attorney Merkovich B.V. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
  },
};

export const useI18n = () => {
  const locale = useState<string>('locale', () => 'uk');

  const t = (key: string): string => {
    return translations[locale.value]?.[key] || translations['uk']?.[key] || key;
  };

  const setLocale = (lang: string) => {
    locale.value = lang;
    if (import.meta.client) {
      localStorage.setItem('locale', lang);
    }
  };

  // Initialize from localStorage
  if (import.meta.client) {
    const saved = localStorage.getItem('locale');
    if (saved && translations[saved]) {
      locale.value = saved;
    }
  }

  const availableLocales = ['uk', 'en'];

  return { t, locale, setLocale, availableLocales };
};
