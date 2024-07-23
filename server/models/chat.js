const  { Schema, model, Types }=require( "mongoose");
const mongoose=require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports= Chat =mongoose.models.Chat || model("Chat", schema);
