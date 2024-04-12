const mongoose = require("mongoose");
const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Call the function to connect to MongoDB
// connectToMongoDB();

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = connectToMongoDB;
