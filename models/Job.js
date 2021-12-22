const { model, Schema, Types } = require("mongoose");

const JobSchema = new Schema(
  {
    company: {
      type: String,
      require: [true, "Please provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      require: [true, "Please provide a position name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      require: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = model("Job", JobSchema);
