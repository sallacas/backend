import { Client } from "../models/Client.mjs";

export const createClient = async (req, res) => {
  try {
    const validate = await Client.findOne({ document: req.body.document });
    if (validate) {
      return res.status(400).json({
        status: "error",
        message: "Client already exists",
        data: null,
      });
    }
    const { firstName, lastName, document, email, phone, address } = req.body;
    const newClient = new Client({
      firstName,
      lastName,
      document,
      email,
      phone,
      address,
    });
    await newClient.save();
    res.json({ status: "success", message: "Client created", data: newClient });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({
      status: "success",
      message: "Clients retrieved",
      data: clients,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res
        .status(404)
        .json({ status: "error", message: "Client not found", data: null });
    }
    res.json({ status: "success", data: client });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { firstName, lastName, document, email, phone, address } = req.body;
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res
        .status(404)
        .json({ status: "error", message: "Client not found", data: null });
    }
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, document, email, phone, address },
      { new: true }
    );
    res.json({
      status: "success",
      message: "Client updated",
      data: updatedClient,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res
        .status(404)
        .json({ status: "error", message: "Client not found", data: null });
    }
    await Client.findByIdAndDelete(req.params.id);
    res.json({ status: "success", message: "Client deleted", data: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};

export const deleteClientWithOne = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res
        .status(404)
        .json({ status: "error", message: "Client not found", data: null });
    }
    await Client.deleteOne({ _id: req.params.id });
    res.json({ status: "success", message: "Client deleted", data: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: error.message, data: null });
  }
};
