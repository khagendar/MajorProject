import React ,{useEffect, useState}from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box, Divider, Chip } from "@mui/material";
import Navbar from "../HomePage/Navbar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import Paypal from "./Paypal";
import { useAuth } from "../routes/AuthContex";
const PaymentPlans = () => {
  const [checkout,setCheckout]=useState(false);
  const [subscriber,setSubscriber]=useState(false);
  const auth=useAuth();
  const userId=auth?.user?.id
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        console.log(userId);
        const response = await axios.post("http://localhost:5000/getsubscriber", { userId });

        if (response.status === 201) {
          setSubscriber(true);
        }
      } catch (error) {
        console.error("Error fetching subscriber", error);
      } 
    };

    if (userId) {
      fetchSubscriptionStatus();
    }
  }, [userId]);

  return (

    <>
      {
        checkout ?  (
          <>
          <Box sx={{ 
            bgcolor: "#f8f9fa", 
            minHeight: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            backgroundImage: "linear-gradient(to bottom, #f8f9fa, #e8eef6)"
          }}>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Paypal/>
            </Container>
          
          </Box>
          </>
        ):

        (
          <Box sx={{ 
            bgcolor: "#f8f9fa", 
            minHeight: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            backgroundImage: "linear-gradient(to bottom, #f8f9fa, #e8eef6)"
          }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
              <Typography 
                variant="h3" 
                align="center" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  mb: 4,
                  background: "linear-gradient(45deg, #2196f3, #3f51b5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Choose Your Perfect Plan
              </Typography>
              <Typography 
                variant="subtitle1" 
                align="center" 
                gutterBottom 
                sx={{ mb: 5, maxWidth: "600px", mx: "auto", color: "#666" }}
              >
                Select the plan that fits your needs. Upgrade anytime to unlock premium features and enhance your experience.
              </Typography>
              
              <Grid container spacing={4} justifyContent="center">
                {/* Basic Plan */}
                <Grid item xs={12} sm={6} md={5}>
                  <Card 
                    sx={{ 
                      textAlign: "center", 
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      backgroundColor: "#e0e0e0",
                      border: "none",
                      position: "relative",
                      overflow: "visible",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
                      }
                    }}
                  >
                    <Chip 
                      label="Free"
                      sx={{ 
                        position: "absolute",
                        top: -12,
                        right: 24,
                        fontWeight: "bold",
                        px: 1,
                        bgcolor: "#9e9e9e",
                        color: "white"
                      }}
                    />
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Basic
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline", mb: 3 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          $0.0
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1, color: "#666" }}>
                          /month
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ mb: 3 }} />
                      
                      <Box sx={{ textAlign: "left", mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
                          <CancelIcon sx={{ color: "#bdbdbd", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Profile Access
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                              Limited profile details
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
                          <CancelIcon sx={{ color: "#bdbdbd", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Chat Access
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                              No chat access
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
                          <CancelIcon sx={{ color: "#bdbdbd", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Profile Visibility
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                              View less profiles
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
                          <CancelIcon sx={{ color: "#bdbdbd", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Contact Information
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                              Can't view contact information
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
                          <CancelIcon sx={{ color: "#bdbdbd", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Profile Pictures
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                              Can't view profile pictures of paid users
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2, 
                          bgcolor: "#f5f5f5", 
                          color: "#757575",
                          fontWeight: 500
                        }}
                      >
                        Current Plan
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
      
                {/* Premium Plan */}
                <Grid item xs={12} sm={6} md={5}>
                  <Card 
                    sx={{ 
                      textAlign: "center", 
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: "0 8px 24px rgba(33, 150, 243, 0.15)",
                      backgroundColor: "#f0f7ff",
                      border: "2px solid #2196f3",
                      position: "relative",
                      overflow: "visible",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
                      }
                    }}
                  >
                    <Chip 
                      label="Most Popular"
                      color="primary"
                      sx={{ 
                        position: "absolute",
                        top: -12,
                        right: 24,
                        fontWeight: "bold",
                        px: 1
                      }}
                    />
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Premium
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline", mb: 3 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                          $29.99
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1, color: "#666" }}>
                          /month
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ mb: 3 }} />
                      
                      <Box sx={{ textAlign: "left", mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.primary" }}>
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Profile Access
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              Full profile details
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.primary" }}>
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Chat Access
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              Unlimited chat access
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.primary" }}>
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Profile Visibility
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              View more profiles
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.primary" }}>
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Contact Information
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              View contact information
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.primary" }}>
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Profile Pictures
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              View all profile pictures
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.primary" }}>
                          <CheckCircleIcon sx={{ color: "#4caf50", mr: 1.5 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              Search Visibility
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              Higher visibility in search results
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                     {
                      !subscriber ? (
                        <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ 
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "1rem",
                          boxShadow: 4
                        }}
                        onClick={()=>{
                          setCheckout(true);
                        }}
                      >
                        Get Started Now
                      </Button>
                      ):(
                        <Button
                        variant="contained"
                        color="white"
                        size="large"
                        fullWidth
                        sx={{ 
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "1rem",
                          boxShadow: 4
                        }}
                      >
                        You are premium member
                      </Button>
                      )
                     } 
                      

                      
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )
      }

    </>
    
  );
};

export default PaymentPlans;