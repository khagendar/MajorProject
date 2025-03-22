// import React, { useState } from 'react';
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   TextField,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Modal,
// } from '@mui/material';
// import bg from '../src/images/bg5.jpg';
// import Register from './Login/Register';
// import Login from './Login/Login';

// const MatrimonyUI = () => {

//   const [openLoginModal, setOpenLoginModal] = useState(false);

//   const handleOpenLoginModal = () => setOpenLoginModal(true);
//   const handleCloseLoginModal = () => setOpenLoginModal(false);

//   return (
//     <Box>
//       {/* Header Section */}
//       <AppBar position="fixed" sx={{ backgroundColor: 'rgb(243, 182, 162)' }}>
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }} sx={{ color: 'black' }}>
//             EternalBond
//           </Typography>
//           <Typography sx={{ paddingRight: '10px', color: 'black' }}>Already a member?</Typography>
//           <Button
//               color="inherit"
//               sx={{ color: 'primary', textTransform: 'capitalize',fontSize:'17px' }}
//               onClick={handleOpenLoginModal}

//             >
//               login
//             </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           marginTop: '64px', // Adjust for AppBar height
//           height: '100vh', // Full viewport height
//           backgroundImage: `url(${bg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '100%',
//           color: 'white',
//           // padding: '0 16px', // Padding for responsiveness
          
//         }}
//       >
//         < Register />
//       </Box>
    
//       {/* Login Modal */}
//       <Modal open={openLoginModal} onClose={handleCloseLoginModal}>
//         <Login />
//       </Modal>

      

//       {/* Footer Section */}
//       <Box sx={{ backgroundColor: '#f2f5f3', padding: 4, marginTop: 0 }}>
//         <Container maxWidth="lg">
//           <Typography variant="body2" align="center">
//             © 2025 EternalBond.com. All Rights Reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default MatrimonyUI;
