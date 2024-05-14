import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const clientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    document: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
export const Client =
  mongoose.models.Client || mongoose.model("client", clientSchema);
