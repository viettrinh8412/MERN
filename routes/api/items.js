const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route  GET api/items
// @desc   GET All Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    //đặt sao cũng được đối với item
    .then((item) => res.json(item));
});

// @route  POST api/items
// @desc   POST A Items
// @access Private

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    duongdanhinhanh: req.body.duongdanhinhanh,
    loaiTin: req.body.loaiTin,
    tieuDe: req.body.tieuDe,
    content: req.body.content,
  });

  newItem.save().then((item) => res.json(item));
});
// @route  update api/items
// @desc   update A Items
// @access Private
router.post("/update/:id", (req, res) => {
  Item.findById(req.params.id).then((item) => {
    (item.duongdanhinhanh = req.body.duongdanhinhanh),
      (item.loaiTin = req.body.loaiTin),
      (item.tieuDe = req.body.tieuDe),
      (item.content = req.body.content),
      item
        .save()
        .then((item) => res.json(item))
        .catch((err) => res.status(400).json("Error: " + err));
  });
});

// @route  Delete api/items
// @desc   Delete A Items
// @access Private

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
