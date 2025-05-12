const express=require("express")
const router= express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const verifyRole=require("../middleware")
const historyController=require("../controllers/historyController")

router.post("/",historyController.addCallToHistory)
router.get("/",verifyJWT,historyController.getAllHistory)
router.get("/volunteer/:name",verifyJWT,historyController.getHistoryByVolunteer)
router.get("/emergency/:emergencyId",verifyJWT,historyController.getHistoryByEmergencyId)
router.delete('/:id', verifyJWT, verifyRole('admin'), historyController.deleteHistory);
module.exports=router