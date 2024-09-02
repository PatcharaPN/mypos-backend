const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema({
  name: { type: String, require: true },
  unit: { type: String, require: true },
  description: { type: String, require: true },
  addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Price = mongoose.model("Price", priceSchema);
module.exports = Price;
