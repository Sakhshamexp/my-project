// index.js
const http = require("http");

function createServer() {
  return http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Experiment 26 - CI/CD Pipeline running successfully!");
  });
}

// Only start server if run directly (not when required by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  createServer().listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = createServer;
