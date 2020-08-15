const mongooes = require("mongoose");
const Schema = mongooes.Schema;

//Create Schema
const ItemSchema = new Schema({
  duongdanhinhanh: {
    type: String,
    required: true,
  },
  loaiTin: {
    type: String,
    required: true,
  },
  tieuDe: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongooes.model("News", ItemSchema);
