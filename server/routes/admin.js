const express =require( "express");
const {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardStats,
} =require("../controllers/admin.js") ;
const { adminLoginValidator, validateHandler } =require("../lib/validators.js") ;
const { adminOnly } =require("../middlewares/auth.js") ;

const app = express.Router();

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

app.use(adminOnly);

app.get("/", getAdminData);

app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);

app.get("/stats", getDashboardStats);

module.exports= app;
