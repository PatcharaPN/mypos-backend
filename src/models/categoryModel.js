const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productCount: { type: Number, default: 0 },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
