module.exports = {
  apps: [
    {
      name: "medicuro-app",
      script: "npm",
      args: "run preview -- --port 3002 --host 45.132.241.38",
      watch: false,
    },
  ],
};
