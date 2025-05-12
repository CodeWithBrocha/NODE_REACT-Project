const notifyModels = require("../models/notifyModels");
const historyModels = require("../models/historyModels");

const addNotifacation= async({user, call, message,isRead})=>{
    try {
        await historyModels.create({user, call, message,isRead})  
    } catch (error) {
        console.error("Error creating Notifacation")
        res.status(500).json({ message: 'Server error ',error })  
    }
    
    }
     const getHistoryByVolunteer = async (req, res) => {
                try {
                    const { name } = req.params
                const history = await historyModels.find({'user.name':name}).populate('call').populate('user')
                if (!history||history.length ===0) {
                    return res.status(400).json({ message: 'no history was found for this volunteer' })
                }
                res.json(history) 
                } catch (error) {
                    console.error("Error finding history",error)
                    res.status(500).json({ message: 'Server error ',error })    
                }
               
            }  
             const getHistoryByEmergencyId = async (req, res) => {
                        try {
                            const { callId } = req.params
                        const history = await historyModels.find({call:callId}).populate('user')
                        if (!history) {
                            return res.status(400).json({ message: 'No history found' })
                        }
                        res.json(history) 
                        } catch (error) {
                            console.error("Error finding history")
                            res.status(500).json({ message: 'Server error ',error })
                        }
                       
                    }    
                     const getAllNotifacations = async (req, res) => {
                                try {
                                    const history = await historyModels.find().populate('call').populate('user')
                                    if (!history?.length) {
                                        return res.status(400).json({ message: 'No history found' })
                                    }
                                    res.json(history)
                                } catch (error) {
                                    console.error("Error finding history")
                                    res.status(500).json({ message: 'Server error ',error }) 
                                }
            
}
module.exports={
    addNotifacation,
    getAllNotifacations,
    getNotifacationsByVolunteer,
    updateNotifacationStatus,
    deleteNotifacation}