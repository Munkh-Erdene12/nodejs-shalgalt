const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Категорийн нэрийг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [
        50,
        "Категорийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой",
      ],
    },
    slug: String,
    createdUser: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
categorySchema.virtual("content", {
  ref: "blog",
  localField: "_id",
  foreignField: "category",
});
categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("category", categorySchema);
