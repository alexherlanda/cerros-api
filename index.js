const express = require("express");
const config = require("./config");
const volunteersRouter = require("./routes/volunteers");

const app = express();

volunteersRouter(app);

app.listen(config.port, (error) => {
  if (error) {
    console.log("An error ocurred", error);
  }

  console.log("App running on port", config.port);
});
