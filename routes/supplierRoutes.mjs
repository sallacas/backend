import { Router } from "express";

import {
  createSupplier,
  getSupplier,
  getSupplierByID,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.mjs";

const supplierRouter = Router();

supplierRouter.post("/", createSupplier);
supplierRouter.get("/", getSupplier);
supplierRouter.get("/:id", getSupplierByID);
supplierRouter.put("/:id", updateSupplier);
supplierRouter.delete("/:id", deleteSupplier);
//router.delete('/:id', clientController.deleteSuppliertWithOne)

export default supplierRouter;
