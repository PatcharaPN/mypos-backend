const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  storename: { type: String, required: true },
  location: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
