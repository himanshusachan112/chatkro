const express =require("express") ;
const {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} =require("../controllers/chat.js") ;
const {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} =require("../lib/validators.js") ;
const { isAuthenticated } =require("../middlewares/auth.js") ;
const { attachmentsMulter } =require("../middlewares/multer.js") ;

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments
app.post(
  "/message",
  attachmentsMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

// Get Messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get Chat Details, rename,delete
app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

module.exports= app;
