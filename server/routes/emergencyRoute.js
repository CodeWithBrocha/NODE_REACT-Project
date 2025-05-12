const express=require("express")
const router= express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const emergencyController=require("../controllers/emergencyController")


router.post("/",emergencyController.createEmergency)
router.get("/:id",verifyJWT,emergencyController.getEmergencyById)
router.put("/:Id",verifyJWT,emergencyController.updateEmergencyById)
router.delete("/:Id",verifyJWT,emergencyController.deleteEmergencyById)
router.get("/",verifyJWT,emergencyController.getAllEmergencys)
module.exports=router