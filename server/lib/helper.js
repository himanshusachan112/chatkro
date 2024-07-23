const userSocketIDs  =require("../utils/socketstore");

exports.getOtherMember = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());

exports.getSockets = (users = []) => {
  

  const sockets = users.map((user) => userSocketIDs.get(user.toString()));


  return sockets;
};

exports.getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
