const jwt =require("jsonwebtoken") ;
const { ErrorHandler } =require("../utils/utility.js") ;
const { adminSecretKey } =require("../app.js") ;
const { TryCatch } =require("./error.js") ;
const { CHATTU_TOKEN } =require( "../constants/config.js");
const  User  =require("../models/user.js") ;

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[CHATTU_TOKEN];
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});

const adminOnly = (req, res, next) => {
  const token = req.cookies["chattu-admin-token"];

  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATTU_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    
    
    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

module.exports= { isAuthenticated, adminOnly, socketAuthenticator };
