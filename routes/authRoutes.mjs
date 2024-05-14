import express from "express";
import { authenticateUser, userAuth } from "../controllers/authController.mjs";
import { check } from "express-validator";
import { auth } from "../middlewares/auth.mjs";
const authRouter = express.Router();

authRouter.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  authenticateUser
);

authRouter.get("/", auth, userAuth);

export default authRouter;
