const Product = require("../models/productModel");
const redisClient = require("../config/cache.js");
function generateCode(prefix) {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNumber}`;
}

const getProduct = async (req, res) => {
  try {
    const cacheProduct = await redisClient.get("products");
    if (cacheProduct) {
      return res.status(200).json(JSON.parse(cacheProduct));
    }

    const products = await Product.find()
      .populate("createdBy")
      .populate("category");

    await redisClient.set("products", JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getLowStock = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          stock: { $lt: 10 }, // Filter for products with stock less than 10
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 }, // Get the total count of low stock products
          products: { $push: "$$ROOT" }, // Collect the products themselves
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          total: 1,
          products: 1, // Include the products array in the response
        },
      },
    ]);

    // If no products have low stock, return an empty response with total 0
    if (products.length === 0) {
      return res.status(200).json({ total: 0, products: [] });
    }

    res.status(200).json(products[0]); // Send the first (and only) aggregated result
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId).exec();
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error when deleting product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      unit,
      sku,
      store,
      weight,
      weightunit,
      manufacturer,
      category,
      priceunit,
      brand,
      price,
      stock,
      available,
      reserved,
      createdBy,

      prefix = "UNK",
    } = req.body;

    if (!createdBy) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const productImage = req.file.path.replace("public/", "");
    const productId = generateCode(prefix);

    const newProduct = new Product({
      prefix,
      productID: productId,
      name,
      unit,
      sku,
      store,
      weight,
      weightunit,
      manufacturer,
      category,
      brand,
      price,
      stock,
      priceunit,
      available,
      reserved,
      createdBy,
      productImage,
    });

    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id)
      .populate("createdBy")
      .populate("category");
    await redisClient.del("products");
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      unit,
      sku,
      store,
      weight,
      weightunit,
      manufacturer,
      category,
      priceunit,
      brand,
      price,
      stock,
      available,
      reserved,
      createdBy,
      prefix = "UNK",
    } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    let productImage;
    if (req.file) {
      productImage = req.file.path.replace("public/", "");
    } else {
      productImage = existingProduct.productImage;
    }
    const update = await Product.findByIdAndUpdate(
      id,
      {
        prefix,
        name,
        unit,
        sku,
        store,
        weight,
        weightunit,
        manufacturer,
        category,
        brand,
        price,
        stock,
        priceunit,
        available,
        reserved,
        createdBy,
        productImage,
      },
      {
        new: true,
      },
    )
      .populate("createdBy")
      .populate("category");

    if (!update) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
const getInhandAmount = async (req, res) => {
  try {
    const getInhand = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
        },
      },
    ]);
    res.status(200).json(getInhand);
  } catch (error) {
    console.error("Error getting inhand amount:", error);
    res.status(500).send("Server error");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("createdBy")
      .populate("category")
      .populate("store")
      .populate("brand");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product :", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLowStock,
  createProduct,
  getProduct,
  deleteProduct,
  getInhandAmount,
  updateProduct,
  getProductById,
};
