const User = require("../models/user");
const Instructor = require("../models/instructor");
const Banner = require("../models/banner");

exports.getDashboard = (req, res) => {
  res.render("dashboard", { path: "/" });
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
  const {
    image,
    name,
    email,
    country_code,
    mobile,
    gender,
    age,
    dob,
    height,
    weight,
    physical_activity_level,
    medical_conditions,
    allergies,
    diet_preferences,
    password,
  } = req.body;

  User.create({
    image,
    name,
    email,
    country_code,
    mobile,
    gender,
    age,
    dob,
    height,
    weight,
    physical_activity_level,
    medical_conditions,
    allergies,
    diet_preferences,
    password,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditUser = (req, res) => {
  const userId = req.params.id;
  User.findByPk(userId)
    .then((user) => {
      console.log(user.physical_activity_level);
      res.render("edit-user", { userData: user, path: "/edit-user" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = (req, res) => {
  const {
    userId,
    image,
    name,
    email,
    country_code,
    mobile,
    gender,
    age,
    dob,
    height,
    weight,
    physical_activity_level,
    medical_conditions,
    allergies,
    diet_preferences,
  } = req.body;

  User.findByPk(userId)
    .then((user) => {
      user.image = image;
      user.name = name;
      user.email = email;
      user.country_code = country_code;
      user.mobile = mobile;
      user.gender = gender;
      user.age = age;
      user.dob = dob;
      user.height = height;
      user.weight = weight;
      user.physical_activity_level = physical_activity_level;
      user.medical_conditions = medical_conditions;
      user.allergies = allergies;
      user.diet_preferences = diet_preferences;
      return user.save();
    })
    .then((result) => {
      console.log("User Updated");
      console.log(result);
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

exports.getAddBanner = (req  ,res )=>{
  res.render("add-banner" , {path : "/add-banner"})
}

exports.postAddBanner = (req  ,res )=>{
  const status = req.body.status;
  const image = req.file.path

  console.log(image);

  Banner.create({
    image,
    status
  }).then(result=>{
    res.redirect("/banners")
  }).catch(err=>{
    console.log(err);
  })
}