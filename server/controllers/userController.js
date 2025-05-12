const userModels = require("../models/userModels");

const createUser= async(req,res)=>{
    try{
    const {firstName, lastName,number, password, email,role,address}=req.body
    if(!firstName||!lastName||!number||!email||!role){
        return res.status(400).json({ message: 'required fields missing' })
    }
    const user=new userModels({firstName, lastName,number, password, email,role,address})
    await user.save()
        if (user) { 
            return res.status(201).json({ message: 'New user created' })
        } else {
            return res.status(400).json({ message: 'Invalid user ' })
        }
    }
catch(error){
    console.error("Error creating user")
    res.status(500).json({ message: 'Server error ',error })
}}
    const updateUser= async(req,res)=>{
        try {
            const {id}=req.params
            const {firstName, lastName,number, password, email,role,address}=req.body
                const user = await userModels.findById(id).exec()
                if (!user) {
                    return res.status(400).json({ message: 'user not found' })
                }
                user.firstName = firstName
                user.lastName = lastName
                user.email = email
                user.address = address
                user.number = number
                user.role = role
                user.password = password
                const updateUser = await user.save()
                res.json({ message: `${updateUser.firstName} ${updateUser.lastName} updated` })
            
        } 
       
        catch (error) {
            console.error("Error updating user")
            res.status(500).json({ message: 'Server error ',error }) 
        }}
        const deleteUser = async (req, res) => {
            try {
                const { id } = req.params
            const user = await userModels.findById(id).exec()
            if (!user) {
                return res.status(400).json({ message: 'user not found' })
            }
            const result = await user.deleteOne()
            const reply = `${user.firstName} ${user.lastName} deleted`
            res.json(reply) 
            } catch (error) {
                console.error("Error deleting user")
                res.status(500).json({ message: 'Server error ',error })    
            }
           
        }
        const showUserByID = async (req, res) => {
            try {
                const { id } = req.params
            const user = await userModels.findById(id).exec()
            if (!user) {
                return res.status(400).json({ message: 'No user found' })
            }
            res.json(user) 
            } catch (error) {
                console.error("Error finding user")
                res.status(500).json({ message: 'Server error ',error })
            }
           
        }
        const getAllUsers = async (req, res) => {
            try {
                const users = await userModels.find().lean();
                if (!users || users.length === 0) {
                    return res.status(400).json({ message: 'No users found' });
                }
                res.json(users);
            } catch (error) {
                console.error("Error fetching users", error);
                res.status(500).json({ message: 'Server error', error });
            }}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    showUserByID,
    getAllUsers
}
