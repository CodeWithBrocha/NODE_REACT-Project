const emergencyModels = require("../server/models/emergencyModels");
const {addCallToHistory}= require("./historyController")

const createEmergency= async(req,res)=>{
    try {
        const{description,location,status}=req.body
        if(!description||!location){
            return res.status(400).json({ message: 'required fields missing' })
        }
        const emergency=new emergencyModels({description,location,status})
        await emergency.save()
        await addCallToHistory({user: req.user,
             call: emergency, status: emergency.status})
            if (emergency) { 
                return res.status(201).json({ message: 'New emergency created' })
            } else {
                return res.status(400).json({ message: 'Invalid emergency ' })
            }  
    } catch (error) {
        console.error("Error creating emergency")
        res.status(500).json({ message: 'Server error ',error })  
    }
    
    }
    const updateEmergencyById= async(req,res)=>{
        try {
            const id=req.params.id;
            const{description,location,status}=req.body
                const emergency = await emergencyModels.findById(id).exec()
                if (!emergency) {
                    return res.status(400).json({ message: 'user not found' })
                }
                emergency.description=description
                emergency.location=location
                emergency.status=status
 const updateEmergency = await emergency.save()
                res.json({massage: `${updateEmergency} updated`})  
        } catch (error) {
            console.error("Error updating emergency")
            res.status(500).json({ message: 'Server error ',error })    
        }}
     const deleteEmergencyById = async (req, res) => {
                try {
                    const { id } = req.params
                const emergency = await emergencyModels.findById(id).exec()
                if (!emergency) {
                    return res.status(400).json({ message: 'user not found' })
                }
                const result = await emergency.deleteOne()
                res.json({massage:`emergency call  deleted`}) 
                } catch (error) {
                    console.error("Error deleting user")
                    res.status(500).json({ message: 'Server error ',error })    
                }
               
            }  
             const getEmergencyById = async (req, res) => {
                        try {
                            const { id } = req.params
                        const emergency = await emergencyModels.findById(id).exec()
                        if (!emergency) {
                            return res.status(400).json({ message: 'No user found' })
                        }
                        res.json(emergency) 
                        } catch (error) {
                            console.error("Error finding emergency")
                            res.status(500).json({ message: 'Server error ',error })
                        }
                       
                    }    
                     const getAllEmergencies = async (req, res) => {
                                try {
                                    const emergencyRout = await emergencyModels.find().lean()
                                    if (!emergencyRout?.length) {
                                        return res.status(400).json({ message: 'No emergency found' })
                                    }
                                    res.json(emergencyRout)
                                } catch (error) {
                                    console.error("Error finding emergencies")
                                    res.status(500).json({ message: 'Server error ',error }) 
                                }
            

module.exports={
createEmergency,
getEmergencyById,
updateEmergencyById,
deleteEmergencyById,
getAllEmergencies}}