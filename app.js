const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

var corOptions = {
  origin: "https://localhost:3000",
};

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(__dirname + "/static"));

require("./models/index");

app.get("/", (req, res) => {
  res.render("main");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
