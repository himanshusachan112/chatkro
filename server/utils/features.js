const mongoose =require("mongoose") ;
const jwt =require("jsonwebtoken") ;
const { v4 :uuid } =require("uuid") ;
const  cloudinary  =require( "cloudinary").v2;
const { getBase64, getSockets } =require("../lib/helper.js") ;
require("dotenv").config();

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};


const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chattu-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("a");
  const io = req.app.get("io");
  console.log("aa");
  const usersSocket = getSockets(users);
  console.log("aaa");
  io.to(usersSocket).emit(event, data);
  console.log("aaaa");
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
          folder:process.env.FOLDER_NAME
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    
    const results = await Promise.all(uploadPromises);
   
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
  
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

const deletFilesFromCloudinary = async (public_ids) => {
  // Delete files from cloudinary
};
 
module.exports ={

  sendToken,
  cookieOptions,
  emitEvent,
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
};
