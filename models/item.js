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
	price: { type: Float64Array, required: true },
	stockCount: { type: Int32Array, required: true },
});

ItemSchema.virtual("url").get(function () {
	return `inventory/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
