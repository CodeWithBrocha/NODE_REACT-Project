const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const authController = require("../controllers/authController")
router.post("/login", authController.login)
router.post("/register", authController.register)
module.exports = router