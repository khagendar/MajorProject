import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Modal,
  IconButton,
  Divider,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import bg from '../src/images/bg5.jpg';
import Register from './Login/Register';
import Login from './Login/Login';


const MatrimonyUI = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [showProfiles, setShowProfiles] = useState(true);

  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  return (
    <Box>
      {/* Enhanced Header Section */}
      <AppBar position="fixed" sx={{ 
        background: 'linear-gradient(135deg, #FFF3E0 0%, #FFCCBC 100%)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
      }}>
        <Toolbar>
          <Typography 
            variant="h5" 
            style={{ flexGrow: 1 }} 
            sx={{ 
              color: '#943126', 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
            EternalBond
          </Typography>
          <Typography sx={{ 
            paddingRight: '10px', 
            color: '#5D4037',
            fontFamily: '"Roboto", sans-serif',
          }}>
            Already a member?
          </Typography>
          <Button
            sx={{ 
              color: '#943126', 
              textTransform: 'capitalize',
              fontSize: '17px',
              fontWeight: 500,
              borderRadius: '20px',
              padding: '5px 20px',
              '&:hover': {
                backgroundColor: 'rgba(148, 49, 38, 0.08)'
              }
            }}
            onClick={handleOpenLoginModal}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Overlay */}
      <Box
        sx={{
          marginTop: '64px',
          height: '100vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          color: 'white',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,240,245,0.1) 0%, rgba(140,62,70,0.3) 100%)',
            zIndex: 1
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Register />
        </Box>
      </Box>
    
      {/* Login Modal - Styled */}
      <Modal 
        open={openLoginModal} 
        onClose={handleCloseLoginModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Login />
      </Modal>

      {/* Enhanced Footer Section */}
      <Box sx={{ 
        backgroundColor: '#FFF3E0', 
        padding: 6, 
        marginTop: 0,
        borderTop: '1px solid #FFE0B2'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ 
                color: '#943126', 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                mb: 2
              }}>
                <FavoriteIcon sx={{ fontSize: 20, mr: 1, verticalAlign: 'middle' }} />
                EternalBond
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4037', mb: 2 }}>
                Finding your perfect match has never been easier. Begin your journey to forever today.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5D4037', mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4037', mb: 1 }}>
                eternalbonduser@gmail.com
              </Typography>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3, backgroundColor: '#FFE0B2' }} />
          
          <Typography variant="body2" align="center" sx={{ color: '#795548' }}>
            © 2025 EternalBond.com. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MatrimonyUI;



