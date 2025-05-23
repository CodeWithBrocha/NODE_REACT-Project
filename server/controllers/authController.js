const User = require("../models/userModels")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
 
  
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required'})
    }
    const foundUser = await User.findOne({email}).lean()
    if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
   }
    const match = await bcrypt.compare(password,foundUser.password)
    if(!match)return res.status(401).json( {message:'Unauthorized' })
    const userInfo= {_id:foundUser._id,name:foundUser.name,
    roles:foundUser.roles, username:foundUser.username,
    email:foundUser.email}
    const accessToken=
    jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})}
    
 const register = async (req,res)=>{
    const {username, password, name, email, phone} = req.body
    if (!name || !username || !password) {// Confirm data
        return res.status(400).json({message:'All fields are required'})
        }
        const duplicate = await User.findOne({username:username}).lean()
        if(duplicate){
        return res.status(409).json({message:"Duplicate username"})}
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject= {name,email,username,phone,password:hashedPwd}
    const user = await User.create(userObject)
    if (user) { // Created
    return res.status(201).json({message:`New user ${user.username}created` })
    } 
    else {
    return res.status(400).json({message:'Invalid user received'})
 }}
 module.exports = {login, register}