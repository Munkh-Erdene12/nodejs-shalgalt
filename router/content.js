const router = require("express").Router();
const {
  createBlog,
  blogUpdate,
  deleteblog,
  catblog,
} = require("../controller/blog");
const { protect } = require("../middleware/protect");
const { upload } = require("../middleware/upload");
router
  .post("/", protect, upload.array("image"), createBlog)
  .put("/:id", protect, blogUpdate)
  .delete("/:id", protect, deleteblog);
module.exports = router;
