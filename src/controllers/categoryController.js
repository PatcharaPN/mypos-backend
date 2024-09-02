const Category = require("../models/categoryModel");
const getCategoriesWithProductCount = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
        },
      },
      {
        $project: {
          products: 0,
        },
      },
    ]);
    const populatedCategories = await Category.populate(categories, {
      path: "createdBy",
    });

    res.status(200).json(populatedCategories);
  } catch (error) {
    console.error("Error fetching categories with product count", error);
    res
      .status(500)
      .json({ message: "Failed to get categories with product count" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().populate("createdBy");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all categories" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, createdBy, description } = req.body;
    if (!createdBy) {
      return res.status(400).json({ message: "User id is required" });
    }
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    let newCategory = new Category({ name, createdBy, description });
    newCategory = await newCategory.save();
    newCategory = await Category.populate(newCategory, { path: "createdBy" });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoriesWithProductCount,
};
