const Composite = require("../models/compositeModel");

const findAllComposite = async (req, res) => {
  try {
    const result = await Composite.find()
      .populate("addedBy")
      .populate("products");
    res.status(200).json(result);
  } catch (error) {
    console.log("error when finding all composite item");
    res.status(500).json({
      message: "An error occurred while creating Composite item",
      error: error.message,
    });
  }
};
const createComposite = async (req, res) => {
  try {
    const { name, addedBy, products } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    let newComposite = new Composite({
      name,
      addedBy,
      products,
    });
    newComposite = await newComposite.save();
    newComposite = await Composite.findById(newComposite._id)
      .populate("products")
      .populate("addedBy");
    res.status(201).json({
      message: "Composite item created successfully",
      compositeItem: newComposite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating Composite item",
      error: error.message,
    });
  }
};
const findTotal = async (req, res) => {
  try {
    const composites = await Composite.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$productDetails" },
        },
      },
      {
        $project: {
          productDetails: 0,
        },
      },
    ]);
    const populatedComposite = await Composite.populate(composites, {
      path: "products",
      path: "addedBy",
    });

    res.status(200).json(populatedComposite);
  } catch (error) {
    console.error("Error fetching composites with product count", error);
    res
      .status(500)
      .json({ message: "Failed to get composites with product count" });
  }
};
module.exports = { createComposite, findAllComposite, findTotal };
