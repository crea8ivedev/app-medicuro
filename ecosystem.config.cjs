module.exports = {
  apps: [
    {
      name: "medicuro-app",
      script: "npm",
      args: "run preview -- --port 5173 --host 45.132.241.38",
      watch: false,
    },
  ],
};
