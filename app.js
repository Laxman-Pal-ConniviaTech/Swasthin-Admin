const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./utils/database");
const ejs = require("ejs");
const path = require("path")
const User = require("./models/user");
const Admin = require("./models/admin")

const port = process.env.PORT || 5000;
const app = express();


app.set("view engine" , "ejs");
app.set("views" , "views");

app.use(express.json());

app.use(express.static(path.join(__dirname , "public")))

app.get("/", (req, res) => {
    // User.findAll()
    // .then((user) => {
    //   res.send(user);
    // })
    // .catch((error) => console.log(error.message));
    res.render("dashboard")
});

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  })
  .catch((error) => {
    console.log("Error syncing table:", error);
  });
