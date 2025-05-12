const express= require("express")
const router=express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const userController=require("../controllers/userController")

router.post("/", userController.createUser);
router.put("/:id",verifyJWT, userController.updateUser);
router.delete("/:id",verifyJWT, userController.deleteUser);
router.get("/:id",verifyJWT, userController.showUserByID);
router.get("/",verifyJWT, userController.getAllUsers);
 
module.exports=router