module.exports = {
  apps: [
    {
      name: "medicuro-app-staging",
      script: "npm",
      args: "run preview -- --port 3011 --host 0.0.0.0",
      watch: false,
    },
  ],
};
