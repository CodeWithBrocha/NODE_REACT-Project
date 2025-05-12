const express=require("express")
const router= express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const notifyController=require("../controllers/notifyController")


router.post("/",verifyJWT,notifyController.addNotifacation)
router.get("/",verifyJWT,notifyController.getAllNotifacations)
router.get("/volunteer/:vId",verifyJWT,notifyController.getNotifacationsByVolunteer)
router.put("/volunteer/:vId",verifyJWT,notifyController.updateNotifacationStatus)
router.delete("/:id",verifyJWT,notifyController.deleteNotifacation)
module.exports=router