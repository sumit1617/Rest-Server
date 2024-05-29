const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Book = require("../models/bookModel");

// Create Book
exports.addBook = catchAsyncErrors(async (req, res, next) => {
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
});

// Get all book
exports.getAllBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.find();

  res.status(201).json({
    success: true,
    book,
  });
});

// Get single book
exports.getSingleBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler(`Book Does not exist ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// Update the product
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new ErrorHandler(`Book Does not exist ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// Delete the Book
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new ErrorHandler(`Book Does not exist ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    message: "Book Deleted Sucessfully",
  });
});
