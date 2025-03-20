const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const FormController =require('../controllers/SubmitForm');
const SettingsController=require('../controllers/Settings');
const ProfileDetailsController=require('../controllers/ProfileDetailsEdit')
const ConversationController = require('../controllers/conversation'); 
const MessageController=require('../controllers/message');
const userController=require('../controllers/userController')
const MatchesController=require('../controllers/MatchesController');
const ShortListController=require('../controllers/shortlistController');
const NotificationController =require('../controllers/Notification');
const SearchController=require('../controllers/SearchController');
const Connections=require('../controllers/Connection');
const Connected =require("../controllers/ConnectedAccounts");
const VerifyProfile=require("../controllers/ProfileVerifyController");
const preferenceCont = require('../controllers/preferencecont');
const multer=require('multer');
const storage = multer.memoryStorage(); // Store image in memory as a Buffer
const upload = multer({ storage: storage });


router.post("/register", LoginController.Register);
router.post("/Login",LoginController.Login);
router.post("/submit-form",FormController.normalDetails);
router.post("/update-professional",FormController.professionalDetails);
router.post("/FamilyDetails",FormController.familyDetails);
router.post("/ProfileImage",FormController.ProfileImage);
router.get('/get-form/:userId',FormController.getForm);
router.post('/change-password',SettingsController.changePassword);
router.delete('/delete-account',SettingsController.deleteAccount);
router.put('/update-bio/:userId',ProfileDetailsController.PersonalBio);
router.put('/update-baiscdetails/:userId',ProfileDetailsController.BasicDetails);
router.post("/Mbti-Result",FormController.mbtiResult);
router.get("/AllProfiles",FormController.AllProfiles);
router.post("/Forgot-password",LoginController.ForgotPassword);
router.put("/Update-password",LoginController.Changepassword);

//messages
router.get('/user/:id', userController.getUserById);
router.post('/conversation',ConversationController.conversation);
router.get('/conversation/:userId',ConversationController.conversationGet);
router.post('/conversation/messages', upload.single('image'), MessageController.Message);
router.get('/conversation/messages/:conversationId',MessageController.MessageGet);
router.delete('/conversation/:conversationId/:userId', ConversationController.deleteConversation);
router.get('/conversation',ConversationController.ConversationDetails);
router.put('/conversation', ConversationController.updateConversation);
router.delete('/DeleteMessage/:id',MessageController.DeleteMessage);
router.put('/UpdateConversationDate/:conversationId',ConversationController.updateConversationDate);
router.put('/reaction/:messageId',MessageController.Reaction);
router.put('/reply/:messageId',MessageController.Reply);
router.get('/Search',userController.getAllUsers);

router.get('/matches/:userId',MatchesController.getMatches);
router.post("/shortlist",ShortListController.shortlist);
router.delete("/shortlist/:userId/:profileId",ShortListController.deleteShortList);
router.get("/shortlist/:userId",ShortListController.getShortListUser);

//Notification
router.post('/send-interest',NotificationController.createNotification);
router.delete("/notification/:notificationId",NotificationController.DeleteNotification);
router.put("/:notificationId/read",NotificationController.AcceptNotification);  
router.get("/notificationUser/:userId",NotificationController.UserNotifications);  
router.get("/notification/notificationsCount/:receiverId",NotificationController.NotificationCount); 
//Search
router.get("/search/:accId",SearchController.SearchById);
router.get("/searchmatches",SearchController.SearchProfiles);

//Connections
router.post("/requestSend",Connections.SendRequest);
router.get("/requests/:userId/:status",Connections.Requests);
router.put("/accept/:id",Connections.Accept);
router.put("/reject/:id",Connections.Reject);
router.delete("/connections/remove",Connections.RemoveConnetion);

//Connected
router.get('/connections/:userId',Connected.Connected);
router.post("/connected",Connected.CreateConnection);
router.delete('/disconnect/:userId1/:userId2',Connected.Disconnect);

//verify profile
router.post("/verify-profile",VerifyProfile.VerifyProfile);
router.get("/verifications",VerifyProfile.Verification);
router.put("/verify-profile/:id",VerifyProfile.verificationStatus);

//preference
router.post("/setPreference",preferenceCont.setPreference)
router.get("/getPreference",preferenceCont.getPreference)
router.get("/matchPreference",preferenceCont.matchPreference)

module.exports = router;


