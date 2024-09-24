const mongoose = require("mongoose");
const Brand = require("./brandModel");
const Schema = mongoose.Schema;

function generateProductID(prefix) {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNumber}`;
}

const productSchema = new Schema(
  {
    productID: {
      type: String,
      unique: true,
    },
    name: { type: String },
    unit: { type: String },
    sku: { type: String },
    store: { type: Schema.Types.ObjectId, ref: "Store" },
    weight: { type: Number, required: true },
    weightunit: { type: String, required: true },
    priceunit: { type: String },
    manufacturer: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    dimension: { type: Number, default: 1 },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    available: { type: Number, default: 1 },
    reserved: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    productImage: { type: String },
  },
  { timestamps: true },
);

productSchema.pre("save", async function (next) {
  if (!this.isModified("brand") || !this.isNew) return next();
  try {
    const brand = await Brand.findById(this.brand);
    if (brand) {
      this.productID = generateProductID(brand.prefix);
    } else {
      this.productID = generateProductID("UNK");
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
