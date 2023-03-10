const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./utils/database");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

const adminRoutes = require("./routes/admin.route");
const authRoutes = require("./routes/auth")

const port = process.env.PORT || 5000;
const app = express();

const store = new SequelizeStore({
  db: sequelize,
})

app.set("view engine", "ejs");
app.set("views", "views");

app.use(session({
  secret : "hsdgsjdghfsjdfhgsjdfhgsjfhgsjfh",
  store : store,
  resave : false,
  saveUninitialized : true,
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload({
  useTempFiles : true
}));

app.use(adminRoutes)
app.use(authRoutes)
app.use((req , res)=>{
  res.render("404")
})

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  })
  .catch((error) => {
    console.log("Error syncing table:", error);
  });
