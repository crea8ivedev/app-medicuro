module.exports = {
  apps: [
    {
      name: "app-medicuro",
      script: "npm",
      args: "run preview -- --port 3003 --host 0.0.0.0",
      watch: false,
      env: {
        PORT: 3003,
        HOST: "0.0.0.0",
      },
    },
  ],
};
