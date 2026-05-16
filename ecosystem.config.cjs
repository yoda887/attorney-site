module.exports = {
  apps: [
    {
      name: 'lawyer-api',
      script: './backend/dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      }
    },
    {
      name: 'lawyer-nuxt',
      script: './frontend/.output/server/index.mjs',
      instances: 1, // or 1, if low resources
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      }
    }
  ]
};
