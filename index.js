const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const expressApp = express();

mongoose
  .connect(
    `mongodb+srv://Igor:somepassword1999@main.2p6yd.mongodb.net/Shop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));

const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

expressApp.use("/api/", require("./routes/routes"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
