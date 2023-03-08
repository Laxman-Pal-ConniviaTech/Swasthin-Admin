const Admin = require("../models/admin");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  Admin.findOne({ where: { email: email } })
    .then((admin) => {
      if (admin.password !== password) {
        return res.redirect("/login");
      }

      if (admin.password === password) {
        req.session.admin = admin;
        res.redirect("/");
      }
     
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getLogout = (req , res)=>{
    req.session.destroy((error)=>{
       return res.redirect("/login")
       
    })
}