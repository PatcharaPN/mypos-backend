require("dotenv").config();
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
//Listen Port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
