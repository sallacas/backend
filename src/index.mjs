import express from "express";
import cors from "cors";
import UserRouter from "../routes/userRoutes.mjs";
import authRouter from "../routes/authRoutes.mjs";
import clientRouter from "../routes/clientRoutes.mjs";
import supplierRouter from "../routes/supplierRoutes.mjs";

const app = express();

import { connectDatabase } from "../config/db.mjs";

connectDatabase();

app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use("/api/users", UserRouter);
app.use("/api/auth", authRouter);
app.use("/api/clients", clientRouter);
app.use("/api/suppliers", supplierRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
