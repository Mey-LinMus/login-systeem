const express = require("express");
const cors = require("cors");
const registerRouter = require("./register");
const loginRouter = require("./login");

const app = express();
const port = 8080;

app.use(cors()); 

app.use(express.json());

app.use("/", registerRouter);
app.use("/", loginRouter);

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
