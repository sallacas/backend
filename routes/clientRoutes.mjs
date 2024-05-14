import { Router } from "express";

import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clientController.mjs";

const clientRouter = Router();

clientRouter.post("/", createClient);
clientRouter.get("/", getClients);
clientRouter.get("/:id", getClientById);
clientRouter.put("/:id", updateClient);
clientRouter.delete("/:id", deleteClient);
//router.delete('/:id', clientController.deleteClientWithOne)

export default clientRouter;
