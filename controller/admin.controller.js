const User = require("../models/user");
const Instructor = require("../models/instructor");
const Banner = require("../models/banner");
const cloudinary = require("../utils/cloudinary")

exports.getDashboard = async (req, res) => {
  const userCount = await User.count()
  const instructorCount = await Instructor.count()
  console.log(userCount);
  res.render("dashboard", { path: "/" , totalUsers : userCount , totalInstructors : instructorCount });
};

exports.getUserList = (req, res) => {
  User.findAll()
    .then((users) => {
      res.render("users_list", { users: users, path: "/users_list" });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getUserDetails = (req, res) => {
  const userId = req.params.id;
  User.findByPk(userId)
    .then((user) => {
      res.render("user_details", { userData: user, path: "/user_details" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddUser = (req, res) => {
  res.render("add-user", { path: "/add-user" });
};

exports.postAddUser = (req, res) => {

  const file = req.files.image;

  cloudinary.uploader.upload(file.tempFilePath , {folder : "userProfile"}).then((imgUrl) => {
   return User.create({
      image : imgUrl.secure_url,
      name :req.body.name ,
      email:req.body.email,
      country_code:req.body.country_code,
      mobile:req.body.mobile,
      gender:req.body.gender,
      age:req.body.age,
      dob:req.body.dob,
      height:req.body.height,
      weight:req.body.weight,
      physical_activity_level:req.body.physical_activity_level,
      medical_conditions:req.body.medical_conditions,
      allergies:req.body.allergies,
      diet_preferences:req.body.diet_preferences,
      password:req.body.password,
    })
    }).then(result=>{
      res.redirect("/users_list")
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditUser = (req, res) => {
  const userId = req.params.id;
  User.findByPk(userId)
    .then((user) => {
      res.render("edit-user", { userData: user, path: "/edit-user" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res) => {
  
const id = req.body.id
  const file = req.files.image;

  cloudinary.uploader.upload(file.tempFilePath , {folder : "userProfile"} , (err , url)=>{
    User.findByPk(id)
    .then((user) => {
      user.image = url.secure_url;
      user.name = req.body.name;
      user.email = req.body.email;
      user.country_code = req.body.country_code;
      user.mobile = req.body.mobile;
      user.gender = req.body.gender;
      user.age = req.body.age;
      user.dob = req.body.dob;
      user.height = req.body.height;
      user.weight = req.body.weight;
      user.physical_activity_level = req.body.physical_activity_level;
      user.medical_conditions = req.body.medical_conditions;
      user.allergies = req.body.allergies;
      user.diet_preferences = req.body.diet_preferences;
      return user.save()
    })
  }).then((result) => {
    console.log("User Update");
      res.redirect("/users_list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.removeUser = (req, res) => {
  const rmId = req.params.id;

  User.destroy({ where: { id: rmId } })
    .then((result) => {
      console.log("User Deleted");
      res.redirect("/users_list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getInstructorList = (req, res) => {
  Instructor.findAll()
    .then((instructors) => {
      res.render("instructors_list", {
        instructors: instructors,
        path: "/instructors_list",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getInstructorDetails = (req, res) => {
  const instructorId = req.params.id;
  Instructor.findByPk(instructorId)
    .then((instructor) => {
      res.render("instructor_details", {
        instructorData: instructor,
        path: "/user_details",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddInstructor = (req, res) => {
  res.render("add-instructor", { path: "/add-instructor" });
};

exports.getBanners = (req, res) => {
  Banner.findAll()
    .then((banners) => {
      res.render("banners", { path: "/banners", banners: banners });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddBanner = (req, res) => {
  res.render("add-banner", { path: "/add-banner" });
};

exports.postAddBanner = (req, res) => {
  const status = req.body.status;
  const file = req.files.image;

  cloudinary.uploader.upload(file.tempFilePath, {folder : "banners" } , (err , url)=>{
    Banner.create({
      image : url.secure_url,
      status,
    })
  }).then((result) => {
    console.log(result);
      res.redirect("/banners");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUpdateBanner = (req, res) => {
  const bannerId = req.params.id;

  Banner.findByPk(bannerId)
    .then((banner) => {
      res.render("edit-banner", { path: "/edit-banner", banner: banner });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.updateBanner = (req , res)=>{
  const { id ,status} = req.body;
 const file = req.files.image;

  cloudinary.uploader.upload(file.tempFilePath, {folder : "banners" } , (err , url)=>{

    Banner.findByPk(id)
    .then((banner) => {
      banner.image = url.secure_url;
      banner.status = status;
      return banner.save()
    })
  }).then((result) => {
    console.log("Banner Update");
      res.redirect("/banners");
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.removeBanner = (req , res )=>{
  const id = req.params.id;
  
  Banner.findByPk(id).then(banner=>{
    return banner.destroy();
  }).then(result=>{
    console.log("Banner Deleted");
    res.redirect("/banners");
  }).catch(err=>{
    console.log(err);
  })
}