module.exports = {
  apps: [
    {
      name: "medicuro-app",
      script: "npm",
      args: "run preview -- --port 3003",
      watch: false,
    },
  ],
};
