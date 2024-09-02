const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
});

const Unit = mongoose.model("Unit", unitSchema);
module.exports = Unit;
