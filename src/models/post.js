const { format } = require("date-fns");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 300 },
  keyword: { type: String, required: true, minLength: 2, maxLength: 80 },
  text: { type: String, required: true, minLength: 3, maxLength: 5000 },
  timestamp: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, required: true },
});

PostSchema.virtual("timestampFormat").get(function () {
  return format(this.timestamp, "PPP");
});

PostSchema.virtual("titleFormat").get(function () {
  return this.title.toLowerCase().replaceAll(" ", "-");
});

module.exports = mongoose.model("Post", PostSchema);
