import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../routes/AuthContex";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [selected, setSelected] = useState(() => localStorage.getItem("selectedIcon") || "");
  const [user, setUser] = useState({ name: "", avatar: "" });
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-form/${auth?.user?.id}`);
        setUser({
          name: response?.data?.data?.name,
          avatar: response?.data?.data?.image,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/${auth?.user?.id}/pending`);
        setNotifications(response.data.receivedRequests);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        let totalCount = 0;
        for (const notification of notifications) {
          const response = await axios.get(`http://localhost:5000/notification/notificationsCount/${notification.receiver}`);
          totalCount += response.data.count || 0;
        }
        setNotificationCount(totalCount);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    if (notifications.length > 0) {
      fetchNotificationCount();
    }
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("selectedIcon", selected);
  }, [selected]);

  const handleIconClick = (icon, path) => {
    setSelected(icon);
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#ff5722", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EternalBond
        </Typography>

        <Box sx={{ display: "flex", gap: 2.5 }}>
          {[
            { icon: <HomeIcon />, name: "home", path: "/Home" },
            { icon: <GroupIcon />, name: "group", path: "/Matches" },
            { icon: <MessageIcon />, name: "chat", path: "/chat" },
            { icon: <SearchIcon />, name: "search", path: "/Search" },
            { icon: <FavoriteBorderIcon />, name: "favorite", path: "/Favorites" },
          ].map(({ icon, name, path }) => (
            <IconButton
              key={name}
              onClick={() => handleIconClick(name, path)}
              sx={{
                border: selected === name ? "2px solid black" : "none",
                borderRadius: "50%",
                backgroundColor: selected === name ? "rgba(0, 0, 0, 0.1)" : "transparent",
                width: "45px",
                height: "45px",
              }}
            >
              {React.cloneElement(icon, { sx: { color: "#fff", fontSize: "24px" } })}
            </IconButton>
          ))}

          <IconButton
            onClick={() => handleIconClick("notifications", "/Notification")}
            sx={{
              border: selected === "notifications" ? "2px solid black" : "none",
              borderRadius: "50%",
              backgroundColor: selected === "notifications" ? "rgba(0, 0, 0, 0.1)" : "transparent",
              width: "45px",
              height: "45px",
            }}
          >
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon sx={{ color: "#fff", fontSize: "24px" }} />
            </Badge>
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
            {user.name || "Loading..."}
          </Typography>
          <Avatar
            src={user.avatar}
            sx={{
              bgcolor: user.avatar ? "transparent" : "#ffcc80",
              cursor: "pointer",
              border: selected === "avatar" ? "2px solid black" : "none",
            }}
            onClick={() => handleIconClick("avatar", "/MyProfile")}
          >
            {!user.avatar ? user.name : null}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;




// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Avatar,
//   IconButton,
//   Badge,
//   Tooltip,
//   Container,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import HomeIcon from "@mui/icons-material/Home";
// import GroupIcon from "@mui/icons-material/Group";
// import MessageIcon from "@mui/icons-material/Message";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteRounded";
// import { useAuth } from "../routes/AuthContex";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const [selected, setSelected] = useState(() => localStorage.getItem("selectedIcon") || "");
//   const [user, setUser] = useState({ name: "", avatar: "" });
//   const [notifications, setNotifications] = useState([]);
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/get-form/${auth?.user?.id}`);
//         setUser({
//           name: response?.data?.data?.name,
//           avatar: response?.data?.data?.image,
//         });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [auth?.user?.id]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/requests/${auth?.user?.id}/pending`);
//         setNotifications(response.data.receivedRequests);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, [auth?.user?.id]);

//   useEffect(() => {
//     const fetchNotificationCount = async () => {
//       try {
//         let totalCount = 0;
//         for (const notification of notifications) {
//           const response = await axios.get(`http://localhost:5000/notification/notificationsCount/${notification.receiver}`);
//           totalCount += response.data.count || 0;
//         }
//         setNotificationCount(totalCount);
//       } catch (error) {
//         console.error("Error fetching notification count:", error);
//       }
//     };

//     if (notifications.length > 0) {
//       fetchNotificationCount();
//     }
//   }, [notifications]);

//   useEffect(() => {
//     localStorage.setItem("selectedIcon", selected);
//   }, [selected]);

//   const handleIconClick = (icon, path) => {
//     setSelected(icon);
//     navigate(path);
//   };

//   // Navigation items with labels for tooltips
//   const navItems = [
//     { icon: <HomeIcon />, name: "home", path: "/Home", label: "Home" },
//     { icon: <GroupIcon />, name: "group", path: "/Matches", label: "Matches" },
//     { icon: <MessageIcon />, name: "chat", path: "/chat", label: "Messages" },
//     { icon: <SearchIcon />, name: "search", path: "/Search", label: "Search" },
//     { icon: <FavoriteBorderIcon />, name: "favorite", path: "/Favorites", label: "Favorites" },
//   ];

//   return (
//     <AppBar
//       position="static"
//       elevation={0}
//       sx={{
//         background: "linear-gradient(135deg, #FF4E78 0%, #FF1E56 100%)",
//         borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
//         boxShadow: "0 4px 12px rgba(255, 30, 86, 0.3)",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             py: 1,
//           }}
//         >
//           {/* Logo */}
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               fontFamily: "'Playfair Display', serif",
//               background: "linear-gradient(90deg, #FFFFFF 0%, #FFD9E6 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
//               letterSpacing: "0.5px",
//               filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))",
//             }}
//           >
//             EternalBond
//           </Typography>

//           {/* Navigation Icons */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               backgroundColor: "rgba(0, 0, 0, 0.15)",
//               borderRadius: "18px",
//               padding: "4px 12px",
//               backdropFilter: "blur(8px)",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
//             }}
//           >
//             {navItems.map(({ icon, name, path, label }) => (
//               <Tooltip key={name} title={label} arrow placement="bottom">
//                 <IconButton
//                   onClick={() => handleIconClick(name, path)}
//                   sx={{
//                     position: "relative",
//                     width: "42px",
//                     height: "42px",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-2px)",
//                       backgroundColor: "rgba(255, 255, 255, 0.15)",
//                     },
//                     "&::after": selected === name ? {
//                       content: '""',
//                       position: "absolute",
//                       bottom: "-4px",
//                       left: "50%",
//                       transform: "translateX(-50%)",
//                       width: "5px",
//                       height: "5px",
//                       borderRadius: "50%",
//                       backgroundColor: "#FFF",
//                       boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
//                     } : {},
//                   }}
//                 >
//                   {React.cloneElement(icon, {
//                     sx: {
//                       color: "#fff",
//                       fontSize: "22px",
//                       filter: selected === name ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "none",
//                     },
//                   })}
//                 </IconButton>
//               </Tooltip>
//             ))}

//             <Tooltip title="Notifications" arrow placement="bottom">
//               <IconButton
//                 onClick={() => handleIconClick("notifications", "/Notification")}
//                 sx={{
//                   position: "relative",
//                   width: "42px",
//                   height: "42px",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                     backgroundColor: "rgba(255, 255, 255, 0.15)",
//                   },
//                   "&::after": selected === "notifications" ? {
//                     content: '""',
//                     position: "absolute",
//                     bottom: "-4px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     width: "5px",
//                     height: "5px",
//                     borderRadius: "50%",
//                     backgroundColor: "#FFF",
//                     boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
//                   } : {},
//                 }}
//               >
//                 <Badge
//                   badgeContent={notificationCount}
//                   color="error"
//                   sx={{
//                     "& .MuiBadge-badge": {
//                       backgroundColor: "#FFDF00",
//                       color: "#212121",
//                       fontWeight: "bold",
//                       boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
//                     },
//                   }}
//                 >
//                   <NotificationsIcon
//                     sx={{
//                       color: "#fff",
//                       fontSize: "22px",
//                       filter: selected === "notifications" ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "none",
//                     }}
//                   />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {/* User Profile */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               background: "rgba(0, 0, 0, 0.15)",
//               borderRadius: "16px",
//               padding: "4px 12px",
//               backdropFilter: "blur(8px)",
//               transition: "all 0.3s ease",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
//               "&:hover": {
//                 background: "rgba(0, 0, 0, 0.25)",
//                 transform: "translateY(-2px)",
//               },
//               cursor: "pointer",
//             }}
//             onClick={() => handleIconClick("avatar", "/MyProfile")}
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "#fff",
//                 fontWeight: 600,
//                 textShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               {user.name || "Loading..."}
//             </Typography>
//             <Avatar
//               src={user.avatar}
//               sx={{
//                 width: 36,
//                 height: 36,
//                 bgcolor: user.avatar ? "transparent" : "#FF85A2",
//                 border: "2px solid white",
//                 boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
//                 transition: "transform 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                 },
//               }}
//             >
//               {!user.avatar && user.name ? user.name.charAt(0) : null}
//             </Avatar>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Navbar;