const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    nameEn: { type: String, required: true },
    nameKn: { type: String },
    comments: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suggestion", suggestionSchema);
