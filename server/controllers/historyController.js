const historyModels = require("../models/historyModels");

const addCallToHistory= async({user, call, status})=>{
    try {
        await historyModels.create({user, call, status})  
    } catch (error) {
        console.error("Error creating history")
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
                     const getAllHistory = async (req, res) => {
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
                                const deleteHistory = async (req, res) => {
                                    try {
                                      const { id } = req.params;
                                      const deleted = await historyModels.findByIdAndDelete(id);
                                      if (!deleted) {
                                        return res.status(404).json({ message: 'History not found' });
                                      }
                                      res.json({ message: 'History deleted successfully' });
                                    } catch (error) {
                                      console.error("Error deleting history", error);
                                      res.status(500).json({ message: 'Server error', error });
                                    }
                                  };
            
}
module.exports={
    addCallToHistory,
     getAllHistory,
     getHistoryByVolunteer,
     getHistoryByEmergencyId}