const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const goalRoutes =
  require("./routes/goalRoutes");

require("dotenv").config();

const connectDB =
  require("./config/db");

const app = express();

// CONNECT DATABASE

connectDB();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);



// TEST ROUTE

app.get("/", (req, res) => {

  res.send("Goal Tracker Backend Running");

});

// PORT

const PORT =
  process.env.PORT || 5000;

// SERVER

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});