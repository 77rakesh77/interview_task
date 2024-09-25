const router = require("express").Router();
const userController = require("../controller/user_controller");
const userVerifyToken = require("../middleware/auth");
const upload = require("../middleware/upload");



router.post("/add_user", upload, userController.userInsert)
router.post("/user_login", userController.UserLogin)
router.put("/updateUser", upload, userVerifyToken, userController.editUser)
router.get("/userDetails", userVerifyToken, userController.profileDisplay)
router.delete("/delete", userVerifyToken, userController.deleteProfile)


module.exports = router