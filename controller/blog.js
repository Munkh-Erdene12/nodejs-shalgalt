const blogModel = require("../model/blog");
const asyncHandler = require("../middleware/asynchandler");
const MyError = require("../utils/MyError");

exports.createBlog = asyncHandler(async (req, res, next) => {
  const img = [];
  for (let file of req.files) {
    img.push(file.filename);
  }
  res.send({
    succes: true,
    data: await blogModel.create({ ...req.body, image: img }),
  });
});
exports.blogUpdate = asyncHandler(async (req, res, next) => {
  const content = await blogModel.findById(req.params.id);
  console.log(content.createdUser.toString());
  console.log(req.userID);
  // if (content.createdUser.toString() !== req.userID) {
  //   throw new MyError(
  //     "Та өөр хэрэглэгчийн мэдээллийг шинэчлэх эрхгүй байна.",
  //     403
  //   );
  // }

  const updatedBlog = await blogModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.send({
    success: true,
    data: updatedBlog,
  });
});
exports.deleteblog = asyncHandler(async (req, res, next) => {
  const content = await blogModel.findById(req.params.id);
  if (content.createdUser.toString() !== req.userID)
    throw new MyError(
      "Та өөр хэрэглэгчийн мэдээллийг устгах эрхгүй байна.",
      403
    );
  res.send({
    success: true,
    data: await blogModel.findByIdAndDelete(req.params.id),
  });
});
exports.catblog = asyncHandler(async (req, res, next) => {
  res.send({
    success: true,
    data: await blogModel.find({ category: req.params.id }),
  });
});
