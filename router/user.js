const router = require("express").Router();
const { register, login, getUser, getUsers } = require("../controller/user");
const { protect } = require("../middleware/protect");
const { authorize } = require("../middleware/authorize");

router.post("/register", register).post("/login", login);

module.exports = router;
