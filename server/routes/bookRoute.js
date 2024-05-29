const express = require("express");
const {
  addBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { route } = require("../app");

const router = express.Router();

router.route("/book").post(addBook);
router.route("/book").get(getAllBook);
router.route("/book/:id").get(getSingleBook);
router.route("/book/:id").put(updateBook);
router.route("/book/:id").delete(deleteBook);

module.exports = router;
