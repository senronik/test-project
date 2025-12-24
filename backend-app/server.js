const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require('./src/routes/auth')
const taskRoutes = require('./src/routes//tasks')
const cors = require('cors')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/auth',authRoutes)
app.use('/api/tasks',taskRoutes)

app.get("/", (req, res) => {
  res.send("Node template working!");
});

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB(); // waits until MongoDB connects

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB. Server not started.");
    console.error(err);
    process.exit(1);
  }
};

startServer();
