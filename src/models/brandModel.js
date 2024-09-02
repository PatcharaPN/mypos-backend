const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brndSchema = new Schema({
  name: { type: String, required: true },
  prefix: { type: String, required: true },
  addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Brand = mongoose.model("Brand", brndSchema);

module.exports = Brand;
