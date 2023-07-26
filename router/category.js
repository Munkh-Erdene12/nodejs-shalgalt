const router = require("express").Router();
const { protect } = require("../middleware/protect");
const { authorize } = require("../middleware/authorize");
const {
  allCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const { catblog } = require("../controller/blog");
router
  .get("/", allCategory)
  .post("/", protect, authorize("admin"), createCategory)
  .put("/:id", protect, authorize("admin"), updateCategory)
  .delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;
