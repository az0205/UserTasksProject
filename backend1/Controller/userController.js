const User = require("../Model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//--register--
const userRegister = async (req, res) => {

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists.",
        status: "failure",
        error: true,
      });
    }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

  await newUser.save();

  res.json({
        message: "User registered successfully!",
        status: "success",
        error: false,
        newUser,
      });
}

//--login--
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User not found.",
      status: "failure",
      error: true,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password.",
      status: "failure",
      error: true,
    });
  }

  const secret = process.env.SECRET_KEY;
  const token = jwt.sign(
    {
      userId: user._id,
    },
    secret,
    { expiresIn: "24h" }
  );

  res.status(200).json({
    message: "Login successful!",
    status: "success",
    error: false,
    token,
  });
}


//----Updating User-----
const updateUser = async (req, res) => {
  const userid = req.params.id;
  const editedUser = req.body;
  const user = await User.findByIdAndUpdate(userid, editedUser, { new: true });

  if (user) {
    const userData = {
      name: user.name,
      email: user.email,
      username: user.username
    };

    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: userData,
    });
  } else {
    res.status(400).json({
      message: "user not found",
      status: "failure",
    });
  }
};

//--------Deleting User----
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (user) {
    res
      .status(200)
      .json({ status: "success", message: "user deleted successfully" });
  } else {
    res.status(400).json({ message: "internal error", status: "failure" });
  }
};
//--------Get all users-------
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    message: "listed all users",
    data: users,
  });
};


//----get user by id----
const getUser = async (req, res) => {
    const userId = req.params.id;
  const user = await User.findById(userId)

  if (user) {
      res.status(200).json({
        status: "success",
        message: "User found",
        data: user,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }
};

module.exports = {
  userRegister,
  userLogin,
  updateUser,
  deleteUser,
  getAllUsers,
getUser
};