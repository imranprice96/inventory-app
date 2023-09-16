const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  price: { type: String, required: true },
  stockCount: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
