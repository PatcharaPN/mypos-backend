const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const priceRoutes = require("./routes/priceRoutes");
const storeRoutes = require("./routes/storeRoutes");
const brandRoutes = require("./routes/brandRoutes");
const unitRoutes = require("./routes/unitRoutes");
const packageRoutes = require("./routes/packageRoutes")
const paymentRoutes = require("./routes/paymentroutes");
const compositeItemRoutes = require("./routes/compositeItemRoutes");
const app = express();

connectDB();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use("/api", productRoutes);
app.use("/api", brandRoutes);
app.use("/api", categoryRoutes);
app.use("/api", storeRoutes);
app.use("/api", priceRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", compositeItemRoutes);
app.use("/api", unitRoutes);
app.use("/api", paymentRoutes);
app.use("/api", customerRoutes);
app.use("/api", packageRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

module.exports = app;
