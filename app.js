const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./utils/database");
const ejs = require("ejs");
const path = require("path");
const User = require("./models/user");
const Admin = require("./models/admin");
const Instructor = require("./models/instructor");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("dashboard");
});
app.get("/users_list", (req, res) => {
  User.findAll()
    .then((users) => {
      res.render("users_list", { users: users });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/instructors_list", (req, res) => {
  Instructor.findAll()
    .then((instructors) => {
      res.render("instructors_list", { instructors: instructors });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/user_details/:id", (req, res) => {
    const userId = req.params.id;
    User.findByPk(userId).then(user=>{
        res.render("user_details" , {user : user});
        // res.send(user)
    }).catch(err=>{
        console.log(err);
    })
    // res.render("user_details");

  
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
