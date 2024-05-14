import { User } from "../models/User.mjs";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecta" });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const userAuth = async (req, res) => {
  try {
    const user = await User.findOne(req.email.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
