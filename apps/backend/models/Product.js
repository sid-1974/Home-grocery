const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nameEn: { type: String, required: true },
    nameKn: { type: String },
    imageUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
