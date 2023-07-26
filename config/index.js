const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `MongoDB холбогдолоо: ${conn.connection.host}`.cyan.underline.bold
  );
};
module.exports = connectDB;
