const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller")

router.get("/", adminController.getDashboard);

router.get("/login", (req, res) => {
  res.render("login")
});


router.get("/users_list",adminController.getUserList );

router.get("/user_details/:id", adminController.getUserDetails );

router.get("/edit-user/:id", adminController.getEditUser );

router.post("/edit-user", adminController.updateUser );

router.get("/remove-user/:id", adminController.removeUser );

router.get("/add-user" , adminController.getAddUser);

router.post("/add-user" , adminController.postAddUser);

router.get("/instructors_list", adminController.getInstructorList);

router.get("/instructor_details/:id", adminController.getInstructorDetails );

router.get("/add-instructor" , adminController.getAddInstructor);

router.get("/banners", adminController.getBanners);

router.get("/add-banner", adminController.getAddBanner);

router.post("/add-banner", adminController.postAddBanner);


module.exports = router;
