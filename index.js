const express = require("express");
const config = require("./config");

const app = express();

app.listen(config.port, (error) => {
  if (error) {
    console.log("An error ocurred", error);
  }

  console.log("App running on port", config.port);
});
