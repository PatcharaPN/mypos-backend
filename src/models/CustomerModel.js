const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customername: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
