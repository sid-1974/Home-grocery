const mongoose = require("mongoose");

const groceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }, // e.g. "500g", "2kg"
  imageUrl: { type: String },
});

const groceryListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [groceryItemSchema],
    sharedWith: [{ type: String }], // Optional: list of people it was shared with
    shareableId: { type: String, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GroceryList", groceryListSchema);
