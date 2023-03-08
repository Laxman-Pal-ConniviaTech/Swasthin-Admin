const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", authMiddleware.isLogin ,  adminController.getDashboard);

router.get("/users_list",authMiddleware.isLogin ,adminController.getUserList );

router.get("/user_details/:id",authMiddleware.isLogin , adminController.getUserDetails );

router.get("/edit-user/:id",authMiddleware.isLogin , adminController.getEditUser );

router.post("/edit-user", authMiddleware.isLogin ,adminController.updateUser );

router.get("/remove-user/:id", authMiddleware.isLogin ,adminController.removeUser );

router.get("/add-user" ,authMiddleware.isLogin , adminController.getAddUser);

router.post("/add-user" , authMiddleware.isLogin ,adminController.postAddUser);

router.get("/instructors_list", authMiddleware.isLogin ,adminController.getInstructorList);

router.get("/instructor_details/:id", authMiddleware.isLogin ,adminController.getInstructorDetails );

router.get("/add-instructor" , authMiddleware.isLogin ,adminController.getAddInstructor);

router.get("/banners", authMiddleware.isLogin ,adminController.getBanners);

router.get("/add-banner", authMiddleware.isLogin ,adminController.getAddBanner);

router.post("/add-banner", adminController.postAddBanner);

router.get("/edit-banner/:id", authMiddleware.isLogin ,adminController.getUpdateBanner);

router.post("/edit-banner", authMiddleware.isLogin ,adminController. updateBanner);

router.get("/remove-banner/:id", authMiddleware.isLogin ,adminController.removeBanner );




module.exports = router;
