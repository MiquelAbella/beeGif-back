const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const seedRouter = require("./routes/seed");
const gifsRouter = require("./routes/gifs");
const userRouter = require("./routes/user");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/seed", seedRouter);
app.use("/gifs", gifsRouter);
app.use("/user", userRouter);

module.exports = app;
