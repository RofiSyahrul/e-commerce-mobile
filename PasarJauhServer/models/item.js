const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemId: Number,
  category: String,
  title: String,
  price: Number,
  rate: Number,
  description: String,
  detail: String,
  brand: String,
  colors: [String],
  stock: Number,
  capacities: [String],
  sizes: [String],
  filenames: [String],
  vote: Number,
  testimonials: [{}]
});

module.exports = mongoose.model("Item", itemSchema);
