const express = require("express");
const mysql = require("mysql2");
const sequelize = require("./utils/database");
const path = require("path");
const bodyParser = require("body-parser");
const multer =  require("multer")

const adminRoutes = require("./routes/admin.route")

const port = process.env.PORT || 5000;
const app = express();

const fileStorage = multer.diskStorage({
  destination : (req , file , cb)=>{
    cb(null , 'images')
  },
  filename : (req , file , cb)=>{
    cb(null , new Date().toISOString() + "-" + file.originalname)
  }
})

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({storage : fileStorage}).single("image"))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/images" , express.static(path.join(__dirname, "images")));

app.use(adminRoutes)

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  })
  .catch((error) => {
    console.log("Error syncing table:", error);
  });
