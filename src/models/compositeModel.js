const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompositeSchema = new Schema(
  {
    name: { type: String, required: true },
    products: { type: Schema.Types.ObjectId, ref: "Product" },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Composite = mongoose.model("Composite", CompositeSchema);

module.exports = Composite;
