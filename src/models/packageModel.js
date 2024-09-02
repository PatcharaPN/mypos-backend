const { defaults } = require("chart.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageScheema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        defaults: [],
      },
    ],
  },
  { timestamps: true },
);

const Package = mongoose.model("Package", packageScheema);

module.exports = Package;
