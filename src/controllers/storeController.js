const Store = require("../models/storeModel");

const getAllStore = async (req, res) => {
  try {
    const store = await Store.find().populate("owner");
    res.status(200).json(store);
  } catch (error) {
    console.log("Failed to fetch Stores", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStoreById = async (req, res) => {
  const { storeId } = req.params;
  try {
    const findStore = await Store.findById(storeId);
    if (!findStore) {
      return res.status(404).json({
        message: `Store with Id ${storeId} was not found`,
      });
    }
    res.status(200).json(findStore);
  } catch (error) {
    console.log("Fail to get Store");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteStore = async (req, res) => {
  const { storeId } = req.params;

  try {
    const deleteStoreById = await Store.findByIdAndDelete(storeId);
    if (!deleteStoreById) {
      return res.status(404).json({
        message: `item with ID ${storeId} was not found`,
      });
    }
    res.status(200).json({
      message: `Item with ID ${storeId} was deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the store",
      error: error.message,
    });
  }
};

const createStore = async (req, res) => {
  let storeImage = null;
  if (req.file) {
    storeImage = req.file.path.replace("public/", "");
  }
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
      storeImage,
    });
    newStore = await newStore.save();

    newStore = await Store.findById(newStore._id)
      .populate("owner")
      .populate("products");
    res.status(201).json({
      message: "Store created successfully",
      store: newStore,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({
      message: "An error occurred while creating the store",
      error: error.message,
    });
  }
};

module.exports = { createStore, getAllStore, deleteStore, getStoreById };
