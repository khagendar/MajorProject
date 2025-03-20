  import React from "react";
  import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
  import { AuthProvider } from "./routes/AuthContex";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

  import Register from "./Landingpage";
  import Login from "./Login/Login";
  import ReligionDetailsForm from './RegisterForms/ReligionDetailsForm';
  import RegisterPersonalDetail from "./RegisterForms/RegisterPersonalDetail";
  import ProfessionalDetailsForm from "./RegisterForms/ProfessionalDetails";
  import Photodetails from './RegisterForms/Photodetails';
  import HomePage from "./HomePage/Home";
  import Profile from "./HomePage/profile";
  import Matches from './HomePage/Matches';
  import Search from './HomePage/Search';
  import ShortList from './HomePage/ShortList';
  import NotificationCard from "./HomePage/Notification";
  import MyProfile from './HomePage/MyProfile'
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import Preferences from './HomePage/Preferences';
  import Settings from "./HomePage/Settings";
  import DeleteAccount from "./HomePage/DeleteAccount";
  import MBTITest from "./RegisterForms/MBTItest";
  import ForgotPassword from "./Login/Forgotpassword";
  import GenerateChatApp from "./chatApplication/GenerateChatApp";
  import Payment from "./Payment/payment";
  import ProfileSearch from "./HomePage/ProfileSearchMatches";
  import Connections from "./HomePage/Connections";
  import Verify from "./HomePage/verify";
  import AdminHome from "../src/AdminPannel/Home";
  function AppContent() {
    return (
      <AuthProvider>
        <div className="App">
        <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            {/* Redirect to Register by default */}
            <Route path="/" element={<Navigate to="/register" />} />

            {/* Public Routes */}
            {/* <Route element={<AuthRoutes />}> */}
            <Route path="/register" element={<Register />} />
            {/* </Route> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/register/ReligionDetails" element={<ReligionDetailsForm />} />
            <Route path="/register/RegisterPersonalDetails" element={<RegisterPersonalDetail />} />
            <Route path="/register/ProfessionalDetails" element={<ProfessionalDetailsForm />} />
            <Route path="/register/PhotoDetails" element={<Photodetails />} />
            <Route path='/mbtiTest' element={<MBTITest/>}/>
            

              {/* Protected User Routes */}
              <Route element={<UserRoutes />}>
            <Route path="/Home" element={<HomePage />} />
            <Route path='/Profile/:userId' element={<Profile/>}/>
            <Route path='/Matches' element={<Matches/>}/>
            <Route path='/Search' element={<Search/>}/>
            <Route path='/Favorites' element={<ShortList/>}/>
            <Route path='/Notification' element={<NotificationCard/>}/>
            <Route path='/MyProfile' element={<MyProfile/>}/>
            <Route path='/preferences' element={<Preferences/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/chat' element={<GenerateChatApp />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/Search/Matches' element={<ProfileSearch/>} />
            <Route path="/Connections" element={<Connections/>} />
            <Route path="/verify" element={<Verify/>} />

            </Route>

  {/* Protected Admin Route */}
            <Route element={<AdminRoutes />}>
            <Route path="/AdminHome" element={<AdminHome/>} />
            </Route>
            {/* <Route path='/deleteAccount' element={<DeleteAccount/>}/> */}
            {/* Add Protected Routes Here */}

             {/* Default Redirect for Undefined Routes */}
             <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    );
  }

  function App() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
  }

  export default App;
