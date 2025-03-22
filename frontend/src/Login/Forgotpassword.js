import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Modal,
  TextField,
  Divider,
  Grid
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import bg from '../images/bg5.jpg';
import Forgot from './Forgot.js';
import Login from './Login.js';

const ForgotPassword = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const primaryColor = "#d8547e"; // Deep rose pink
  const accentColor = "#343148FF"; // Dark blue-purple
  const goldColor = "#D7C49EFF"; // Gold accent

  // Scroll listener to show/hide AppBar
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  // Handle input change
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Simulated Login Handler

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "auto", display: "flex", flexDirection: "column" }}>
      
      {/* AppBar Header */}
      <AppBar 
        position="fixed"
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(8px)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Toolbar>
          <Typography 
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '1px',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            <span style={{ color: accentColor }}>Eternal</span>
            <span style={{ color: primaryColor }}>Bond</span>
          </Typography>
          <Typography sx={{ paddingRight: '10px', color: '#5D4037' }}>
            Already a member?
          </Typography>
          <Button
            sx={{ 
              color: primaryColor, 
              textTransform: 'capitalize',
              fontSize: '17px',
              fontWeight: 500,
              borderRadius: '20px',
              padding: '5px 20px',
              '&:hover': { backgroundColor: 'rgba(216, 84, 126, 0.08)' }
            }}
            onClick={handleOpenLoginModal}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Background Image */}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* Forgot Password Section - Now perfectly centered */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          color: 'white',
          paddingTop: '64px', // To account for AppBar height
          paddingBottom: '60px', // To account for smaller footer
        }}
      >
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Forgot />
        </Container>
      </Box>

      {/* Login Modal */}
      <Modal open={openLoginModal} onClose={handleCloseLoginModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 300,
            textAlign: 'center',
          }}
        >
          {/* <Typography variant="h6" sx={{ mb: 2 }}>
            Login
          </Typography>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={loginData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={loginData.password}
            onChange={handleChange}
          />
          <Button variant="contained" sx={{ backgroundColor: primaryColor, color: "white" }} fullWidth onClick={handleLogin}>
            Submit
          </Button> */}

          <Login/>
        </Box>
      </Modal>

      {/* Smaller Footer Section */}
      <Box sx={{ 
        backgroundColor: '#FFF3E0', 
        padding: '20px 0', // Reduced padding
        borderTop: '1px solid #FFE0B2'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                }}>
                  <span style={{ color: accentColor }}>Eternal</span>
                  <span style={{ color: primaryColor }}>Bond</span>
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="caption" align="right" sx={{ display: 'block', color: '#795548' }}>
                © 2025 EternalBond.com | eternalbonduser@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgotPassword;