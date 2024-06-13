const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Book = require("../models/bookModel");

// Create Book
exports.addBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, img, summary } = req.body;

    const book = await Book.create({
      name,
      img,
      summary,
    });

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
});

// Get all book
exports.getAllBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const book = await Book.find();

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
});

// Get single book
exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      const error = new ErrorHandler(
        `Book Does not exist ${req.params.id}`,
        400
      );
      console.log(error.message);
      return next(error);
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
});

// Update the product
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      const error = new ErrorHandler(
        `Book Does not exist ${req.params.id}`,
        400
      );
      console.log(error.message);
      return next(error);
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
});

// Delete the Book
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      const error = new ErrorHandler(
        `Book Does not exist ${req.params.id}`,
        400
      );
      console.log(error.message);
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Book Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
});
