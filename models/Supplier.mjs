import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const supplierSchema = new Schema(
  {
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    nit: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export const Supplier =
  mongoose.models.supplier || mongoose.model("supplier", supplierSchema);
