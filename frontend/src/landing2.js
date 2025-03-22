import React, { useRef, useState } from "react";
import { Button, Container, Typography, Box, Paper, Grid, TextField, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing1() {
  // Updated color scheme
  const primaryColor = "#d8547e"; // Deep rose pink
  const accentColor = "#ffd166"; // Warm golden yellow
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleClick = () => {
    // Scroll to login section instead of navigating
    loginRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleRegister = () => {
    navigate('/register');
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login attempted with:", email, password);
    // After successful login, you could navigate to dashboard or home
    // navigate('/dashboard');
  };
  
  return (
    <Container 
      maxWidth={false} 
      disableGutters
      sx={{ 
        minHeight: "100vh",
        position: "relative",
        overflow: "auto"
      }}
    >
      {/* Background Image - Updated to a marriage-themed image */}
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1
        }}
      />

      <Container 
        maxWidth="md" 
        sx={{ 
          textAlign: "center", 
          minHeight: "100vh",
          display: "flex", 
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          pt: { xs: 12, md: 16 },
          pb: 8
        }}
      >
        <Box sx={{ mb: 8 }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                fontSize: { xs: "2.5rem", md: "4rem" },
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                letterSpacing: "2px",
                mb: 2
              }}
            >
              <span style={{ color: "#343148FF" }}>Eternal</span><span style={{ color: "#D7C49EFF" }}>Bond</span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <Typography 
              variant="h5" 
              maxWidth="sm" 
              gutterBottom
              sx={{ 
                mb: 4, 
                fontWeight: 500,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                mx: "auto"
              }}
            >
              Where Forever Begins & Love Never Ends
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Typography 
              variant="body1" 
              maxWidth="md" 
              gutterBottom
              sx={{ 
                mb: 4, 
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                mx: "auto"
              }}
            >
              Discover meaningful connections that stand the test of time. Our unique matching algorithm finds your perfect partner based on compatibility, values, and shared dreams.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Box mt={3} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
              <Button 
                variant="contained" 
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  bgcolor: primaryColor, 
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease-in-out",
                  '&:hover': {
                    bgcolor: "#c03c65",
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.3)"
                  }
                }}
                onClick={handleClick}
              >
                Find Your Forever
              </Button>
            </Box>
          </motion.div>
        </Box>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <Paper 
            elevation={12} 
            sx={{ 
              mt: 6, 
              p: 4, 
              maxWidth: "sm", 
              bgcolor: "rgba(255,255,255,0.9)", 
              color: primaryColor,
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              mx: "auto",
              position: "relative"
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{
                fontStyle: "italic",
                lineHeight: 1.6,
                position: "relative"
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  fontSize: "3rem", 
                  position: "absolute", 
                  top: "-25px", 
                  left: "-15px", 
                  opacity: 0.2,
                  display: "block" 
                }}
              >
                "
              </Box>
              Marriage isn't just a bond but a journey where two lives merge into one beautiful story.
              <Box 
                component="span" 
                sx={{ 
                  fontSize: "3rem", 
                  position: "absolute", 
                  bottom: "-50px", 
                  right: "-15px", 
                  opacity: 0.2,
                  display: "block" 
                }}
              >
                "
              </Box>
            </Typography>
          </Paper>
        </motion.div>
        
        {/* Why Choose EternalBond Section - Fixed with proper MUI Grid */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                color: "white",
                mb: 4,
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
              }}
            >
              Why Choose EternalBond?
            </Typography>
            
            <Grid container spacing={4}>
              {/* Our Commitment */}
              <Grid item xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.9)",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: primaryColor,
                        mb: 1,
                        textAlign: "left"
                      }}
                    >
                      Our Commitment
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0,0,0,0.7)",
                        textAlign: "left"
                      }}
                    >
                      We believe in meaningful connections that lead to marriage and lifelong commitment. Our platform is designed for those who are serious about finding their forever partner.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>

              {/* Deep Compatibility */}
              <Grid item xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.9)",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: primaryColor,
                        mb: 1,
                        textAlign: "left"
                      }}
                    >
                      Deep Compatibility
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0,0,0,0.7)",
                        textAlign: "left"
                      }}
                    >
                      Our matching algorithm goes beyond surface-level preferences to ensure lasting connections based on values, goals, and compatibility.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>

              {/* Verified Profiles */}
              <Grid item xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.9)",
                      borderRadius: "15px",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: primaryColor,
                        mb: 1,
                        textAlign: "left"
                      }}
                    >
                      Verified Profiles
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(0,0,0,0.7)",
                        textAlign: "left"
                      }}
                    >
                      Every member is thoroughly verified to ensure authentic connections in a safe environment dedicated to meaningful relationships.
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
        
        {/* Login Component */}
        <Box 
          ref={loginRef} 
          sx={{ 
            mt: 8, 
            mb: 4, 
            scrollMarginTop: "100px" 
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper
              elevation={8}
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                maxWidth: "md",
                mx: "auto"
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: primaryColor,
                  mb: 4,
                  textAlign: "center"
                }}
              >
                Begin Your Journey
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <form onSubmit={handleLogin}>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{
                        mb: 3,
                        color: "rgba(0,0,0,0.8)",
                        textAlign: "left"
                      }}
                    >
                      Sign In
                    </Typography>
                    
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      margin="normal"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(0,0,0,0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: primaryColor,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: primaryColor,
                          },
                        },
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      margin="normal"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(0,0,0,0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: primaryColor,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: primaryColor,
                          },
                        },
                      }}
                    />
                    
                    <Button
                      type="submit"
                      fullWidth
                      sx={{
                        py: 1.5,
                        bgcolor: primaryColor,
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "30px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease-in-out",
                        '&:hover': {
                          bgcolor: "#c03c65",
                          transform: "translateY(-3px)",
                          boxShadow: "0 12px 25px rgba(0,0,0,0.2)"
                        }
                      }}
                    >
                      Sign In
                    </Button>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 2,
                        textAlign: "center",
                        color: "rgba(0,0,0,0.6)"
                      }}
                    >
                      Forgot your password?
                    </Typography>
                  </form>
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Divider orientation="vertical" sx={{ position: 'absolute', height: '100%', left: '50%', transform: 'translateX(-50%)' }} />
                  </Box>
                  <Box sx={{ display: { xs: 'block', md: 'none' }, my: 2 }}>
                    <Divider />
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', px: { xs: 0, md: 3 } }}>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{
                        mb: 3,
                        color: "rgba(0,0,0,0.8)",
                        textAlign: "center"
                      }}
                    >
                      New to EternalBond?
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 4,
                        textAlign: "center",
                        color: "rgba(0,0,0,0.7)"
                      }}
                    >
                      Create your account to begin your journey toward finding your forever partner.
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleRegister}
                      sx={{
                        py: 1.5,
                        color: primaryColor,
                        borderColor: primaryColor,
                        fontWeight: "bold",
                        borderRadius: "30px",
                        borderWidth: "2px",
                        transition: "all 0.3s ease-in-out",
                        '&:hover': {
                          borderColor: primaryColor,
                          bgcolor: 'rgba(216, 84, 126, 0.08)',
                          borderWidth: "2px",
                          transform: "translateY(-3px)",
                        }
                      }}
                    >
                      Create Account
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Container>
  );
}