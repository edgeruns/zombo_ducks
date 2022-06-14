module.exports = {
  apps: [
    {
      name: 'mint.needhair.ru',
      script: 'npm',
      args: 'start -- --port=7780',
      autorestart: true,
      instances: 1,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      cwd: '/home/dev/mint.needhair.ru/client',
      exec_interpreter: '/home/dev/.nvm/versions/node/v16.15.1/bin/node',
    },
  ]
};
