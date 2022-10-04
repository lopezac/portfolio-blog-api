const { format } = require("date-fns");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 3, maxLength: 300 },
  text: { type: String, required: true, minLength: 3, maxLength: 5000 },
  timestamp: { type: Date, default: new Date() },
  published: { type: Boolean, default: false },
});

PostSchema.virtual("timestampFormat").get(function () {
  return format(this.timestamp, "PPP");
});

module.exports = mongoose.model("Post", PostSchema);
