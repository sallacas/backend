import express from "express";
import {
  createUser,
  getUser,
  getUsers,
} from "../controllers/userController.mjs";
import { check } from "express-validator";

const UserRouter = express.Router();

UserRouter.post(
  "/",
  [
    check("username", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
  ],
  createUser
);
UserRouter.get("/", getUsers);
UserRouter.get("/:email", getUser);

export default UserRouter;
