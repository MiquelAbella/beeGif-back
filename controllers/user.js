const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, repPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(409).json({
        ok: false,
        message: "User already exists",
      });
    }

    if (password !== repPassword) {
      return res.status(400).json({
        ok: false,
        message: "Passwords do not match",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    newUser.password = undefined;

    return res.status(201).json({
      ok: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Oops, we could not save your data",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Email and password don't match.",
      });
    }

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Email and password don't match.",
      });
    }

    user.password = undefined;
    return res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Oops, we could not verify your data",
    });
  }
};

module.exports = { registerUser, loginUser };
