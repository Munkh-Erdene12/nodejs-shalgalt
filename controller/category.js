const categoryModel = require("../model/category");
const asyncHandler = require("../middleware/asynchandler");
const MyError = require("../utils/MyError");
const blog = require("../model/blog");
exports.createCategory = asyncHandler(async (req, res, next) => {
  res.send({
    sucess: true,
    data: await categoryModel.create(req.body),
  });
});
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.id);
  if (!category) {
    return next(new MyError("Category not found", 404));
  }
  if (category.createdUser.toString() !== req.userID && req.role !== "admin")
    throw new MyError("ta handah erhgvi baina", 403);
  res.send({
    sucess: true,
    data: await categoryModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }),
  });
});
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryModel.findById(req.params.id);
  if (!category) {
    return next(new MyError("Category not found", 404));
  }
  if (category.createdUser.toString() !== req.userID && req.role !== "admin")
    throw new MyError("ta handah erhgvi baina", 403);
  const data = await categoryModel.findByIdAndDelete(req.params.id);
  const file = await blog.deleteMany({ category: req.params.id });
  res.send({
    sucess: true,
    data,
    file,
  });
});
exports.allCategory = asyncHandler(async (req, res, next) => {
  res.send({
    sucess: true,
    data: await categoryModel.find().populate("content"),
  });
});
