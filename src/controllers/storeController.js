const Store = require("../models/storeModel");
const getAllStore = async (req, res) => {
  try {
    const store = await Store.find().populate("owner");
    res.status(200).json(store);
  } catch (error) {
    console.log("Failed to fetching Store", error);
  }
};
const createStore = async (req, res) => {
  try {
    const { storename, location, owner, products } = req.body;
    if (!storename) {
      return res.status(400).json({
        message: "Store name is required",
      });
    }
    if (!location) {
      return res.status(400).json({
        message: "Location is required",
      });
    }
    if (!owner) {
      return res.status(400).json({
        message: "Owner is required",
      });
    }
    let newStore = new Store({
      storename,
      location,
      owner,
      products,
    });
    newStore = await newStore.save();
    newStore = await Store.findById(newStore._id)
      .populate("owner")
      .populate("products");
    res.status(201).json({
      message: "Store created sucessfully",
      store: newStore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the store",
      error: error.message,
    });
  }
};

module.exports = { createStore, getAllStore };
