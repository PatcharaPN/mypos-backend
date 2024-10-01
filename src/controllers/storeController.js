const Store = require("../models/storeModel");
const { redisClient } = require("../config/cache.js"); // Import the correct Redis client

const getAllStore = async (req, res) => {
  try {
    const cacheStore = await redisClient.get("stores");

    if (cacheStore) {
      return res.status(200).json({
        message: "from Cache",
        data: JSON.parse(cacheStore),
      });
    } else {
      const store = await Store.find().populate("owner");
      await redisClient.set("stores", JSON.stringify(store));
      res.status(200).json(store);
    }
  } catch (error) {
    console.log("Failed to fetch Store", error);
    res.status(500).json({ message: "Internal server error" });
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

    await redisClient.del("stores"); // Use redisClient to delete the cache

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

module.exports = { createStore, getAllStore };
