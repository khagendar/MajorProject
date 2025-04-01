// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Avatar,
//   IconButton,
//   Badge,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import HomeIcon from "@mui/icons-material/Home";
// import GroupIcon from "@mui/icons-material/Group";
// import MessageIcon from "@mui/icons-material/Message";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
//   }, []);

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
//   }, []);

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

//   return (
//     <AppBar position="static" sx={{ bgcolor: "#C03C65", boxShadow: "none" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//           EternalBond
//         </Typography>

//         <Box sx={{ display: "flex", gap: 2.5 }}>
//           {[
//             { icon: <HomeIcon />, name: "home", path: "/Home" },
//             { icon: <GroupIcon />, name: "group", path: "/Matches" },
//             { icon: <MessageIcon />, name: "chat", path: "/chat" },
//             { icon: <SearchIcon />, name: "search", path: "/Search" },
//             { icon: <FavoriteBorderIcon />, name: "favorite", path: "/Favorites" },
//           ].map(({ icon, name, path }) => (
//             <IconButton
//               key={name}
//               onClick={() => handleIconClick(name, path)}
//               sx={{
//                 border: selected === name ? "2px solid black" : "none",
//                 borderRadius: "50%",
//                 backgroundColor: selected === name ? "rgba(0, 0, 0, 0.1)" : "transparent",
//                 width: "45px",
//                 height: "45px",
//               }}
//             >
//               {React.cloneElement(icon, { sx: { color: "#fff", fontSize: "24px" } })}
//             </IconButton>
//           ))}

//           <IconButton
//             onClick={() => handleIconClick("notifications", "/Notification")}
//             sx={{
//               border: selected === "notifications" ? "2px solid black" : "none",
//               borderRadius: "50%",
//               backgroundColor: selected === "notifications" ? "rgba(0, 0, 0, 0.1)" : "transparent",
//               width: "45px",
//               height: "45px",
//             }}
//           >
//             <Badge badgeContent={notificationCount} color="error">
//               <NotificationsIcon sx={{ color: "#fff", fontSize: "24px" }} />
//             </Badge>
//           </IconButton>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
//             {user.name || "Loading..."}
//           </Typography>
//           <Avatar
//             src={user.avatar}
//             sx={{
//               bgcolor: user.avatar ? "transparent" : "#ffcc80",
//               cursor: "pointer",
//               border: selected === "avatar" ? "2px solid black" : "none",
//             }}
//             onClick={() => handleIconClick("avatar", "/MyProfile")}
//           >
//             {!user.avatar ? user.name : null}
//           </Avatar>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  Tooltip,
  Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteRounded";
import { useAuth } from "../routes/AuthContex";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [selected, setSelected] = useState(location.pathname); // Initialize from pathname
  const [user, setUser] = useState({ name: "", avatar: "" });
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Update selected icon when URL changes
  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

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
  }, [auth?.user?.id]);

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
  }, [auth?.user?.id]);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        let totalCount = 0;
        for (const notification of notifications) {
          const response = await axios.get(
            `http://localhost:5000/notification/notificationsCount/${notification.receiver}`
          );
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

  const handleIconClick = (path) => {
    navigate(path);
  };

  const navItems = [
    { icon: <HomeIcon />, path: "/Home", label: "Home" },
    { icon: <GroupIcon />, path: "/Matches", label: "Matches" },
    { icon: <MessageIcon />, path: "/chat", label: "Messages" },
    { icon: <SearchIcon />, path: "/Search", label: "Search" },
    { icon: <FavoriteBorderIcon />, path: "/Favorites", label: "Favorites" },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#C03C65",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
          }}
        >
          {/* App Name */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              background: "white",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.5px",
            }}
          >
            EternalBond
          </Typography>

          {/* Navigation Icons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              backgroundColor: "rgba(0, 0, 0, 0.15)",
              borderRadius: "18px",
              padding: "4px 12px",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            {navItems.map(({ icon, path, label }) => (
              <Tooltip key={path} title={label} arrow placement="bottom">
                <IconButton
                  onClick={() => handleIconClick(path)}
                  sx={{
                    position: "relative",
                    width: "42px",
                    height: "42px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    },
                    "&::after":
                      selected === path
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: "-4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            backgroundColor: "#FFF",
                            boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                          }
                        : {},
                  }}
                >
                  {React.cloneElement(icon, {
                    sx: {
                      color: "#fff",
                      fontSize: "22px",
                      filter: selected === path ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "none",
                    },
                  })}
                </IconButton>
              </Tooltip>
            ))}

            {/* Notifications */}
            <Tooltip title="Notifications" arrow placement="bottom">
              <IconButton
                onClick={() => handleIconClick("/Notification")}
                sx={{
                  position: "relative",
                  width: "42px",
                  height: "42px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  },
                  "&::after":
                    selected === "/Notification"
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: "-4px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: "#FFF",
                          boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                        }
                      : {},
                }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon sx={{ color: "#fff", fontSize: "22px" }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: "rgba(0, 0, 0, 0.15)",
              borderRadius: "16px",
              padding: "4px 12px",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => handleIconClick("/MyProfile")}
          >
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
              {user.name || "Loading..."}
            </Typography>
            <Avatar src={user.avatar} sx={{ width: 36, height: 36 }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
