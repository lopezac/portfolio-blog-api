const { format } = require("date-fns");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true, minLength: 2, maxLength: 500 },
  username: { type: String, required: true, minLength: 2, maxLength: 125 },
  timestamp: { type: Date, default: new Date() },
  post: { type: Schema.Types.ObjectId, required: true },
});

CommentSchema.virtual("timestampFormat").get(function () {
  return format(this.timestamp, "PPP");
});

module.exports = mongoose.model("Comment", CommentSchema);