// const mongoose = require('mongoose')
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI)
//     } catch (err) {
//         console.error("*****error connection to DB****\n" + err)
//     }
// }
// module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;