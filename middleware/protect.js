const asyncHandler = require("./asynchandler");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const MyError = require("../utils/MyError");
exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization)
    throw new MyError(
      "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү",
      401
    );
  const token = req.headers.authorization.split(" ")[1];

  if (!token) throw new MyError("Token байхгүй байна", 401);

  // tuhain token shalgah
  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

  // id hadaglah
  req.userID = tokenObj.id;

  // role hadaglah
  req.role = tokenObj.role;
  next();
});
