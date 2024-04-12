const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const connectToMongoDB = require("./db/connectDB");
var bodyParser = require("body-parser");
connectToMongoDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const UserModel = require("./models/userModel");

app.get("/", async (req, res) => {
  const result = await UserModel.findOne();
  const { addedTimes, updatedTimes } = result;
  res.send({ addedTimes, updatedTimes });
});

const insertNewRec = async (
  name,
  email,
  password,
  addedTimes = 1,
  updatedTimes = 0
) => {
  const newUserObj = {
    name,
    email,
    password,
    addedTimes,
    updatedTimes,
  };

  const newUser = new UserModel(newUserObj);
  try {
    await newUser.save();
    return true;
  } catch (error) {
    return false;
  }
};

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await UserModel.find();
  if (result.length > 0) {
    const existingUser = result[0];
    console.log("existingUser", existingUser);

    await UserModel.deleteMany({});
    const insertRes = await insertNewRec(
      name,
      email,
      password,
      existingUser.addedTimes + 1,
      existingUser.updatedTimes
    );
    if (insertRes) {
      res.send({ msg: "data inserted successfully" });
    } else {
      res.send({ msg: "failed inserting data" });
    }
  } else {
    const insertRes = await insertNewRec();
    if (insertRes) {
      res.send({ msg: "data inserted successfully" });
    } else {
      res.send({ msg: "failed inserting data" });
    }
  }
});

app.put("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await UserModel.findOne();
  const doc = await UserModel.findOneAndUpdate(
    { _id: result._id },
    { name, email, password, updatedTimes: result.updatedTimes + 1 }
  );
  res.send({ msg: "updated successfully.", doc });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
