const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const authController = require("../controllers/authController")
router.post("/login",verifyJWT, authController.login)
router.post("/register",verifyJWT, authController.register)
module.exports = router