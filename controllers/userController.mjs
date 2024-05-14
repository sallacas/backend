import { User } from "../models/User.mjs";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  // if there are errors, return bad request and the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  try {
    // check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: "El usuario ya existe" }] });
    }
    user = new User({
      username,
      email,
      password,
    });
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    res.json({ token: jwt.sign(payload, process.env.JWT_SECRET, {}) });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
