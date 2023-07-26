const userModel = require("../model/user");
const asyncHandler = require("../middleware/asynchandler");
const MyError = require("../utils/MyError");
// {url}/api/users/register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = await user.getJsonWebToken();
  res.status(200).send({
    success: user,
    token: token,
  });
});
// {url}/api/users/login
exports.login = asyncHandler(async (req, res, next) => {
  // оролтыг шалгах
  const { email, password } = req.body;
  if (!email || !password)
    throw new MyError("имэйл болон нууц үгээ дамжуулна уу", 400);

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) throw new MyError("имэйл болон нууц үгээ зөв оруулна уу", 401);

  const ok = await user.checkPassword(password);

  if (!ok) throw new MyError("имэйл болон нууц үгээ зөв оруулна уу", 401);
  res.status(200).send({
    success: true,
    login: true,
    token: user.getJsonWebToken(),
    user: user,
  });
});
// {url}/api/users/
exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await userModel.find();
  if (!user) throw new MyError("Бүртгэлтэй хэрэглэгч байхгүй байна", 400);
  res.status(200).send({
    success: true,
    users: user,
  });
});
// {url}/api/users/
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user)
    throw new MyError(`${req.params.id}-ийм ID тай хэрэглэгч байхгүй`, 400);
  res.status(200).send({
    success: true,
    getUser: user,
  });
});
