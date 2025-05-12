require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();
mongoose.connection.once('open', () => console.log(' Connected to MongoDB'));
mongoose.connection.on('error', err => console.log(' MongoDB connection error:', err));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const userRout = require("./routes/userRoute");
const notifyRout = require("./routes/notifyRoutes");
const emergencyRout = require("./routes/emergencyRoute");
const historyRout = require("./routes/historyRoute");
const authRoute = require("./routes/authRoute")

app.use("/api/Users", userRout);
app.use("/api/Notification", notifyRout);
app.use("/api/Emergency", emergencyRout);
app.use("/api/CallHistory", historyRout);
app.use("/api/auth",authRoute )


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});