module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'npm',
      args: 'run start:dev',
      instances: 1,
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
