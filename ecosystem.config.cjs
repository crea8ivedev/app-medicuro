module.exports = {
  apps: [
    {
      name: "medicuro-app",
      script: "npm",
      args: "run preview -- --port 3003 --host 0.0.0.0",
      watch: false,
    },
  ],
};
