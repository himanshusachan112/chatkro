const { Schema, model, Types } =require("mongoose") ;
const mongoose=require("mongoose");

const schema = new Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },

    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports= Request = mongoose.models.Request || model("Request", schema);
