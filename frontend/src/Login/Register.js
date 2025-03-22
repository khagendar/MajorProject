import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Container, Paper, Grid, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../routes/AuthContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateName = (name) => {
    return /^[A-Za-z]+\s[A-Za-z]+$/.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(formData.name)) {
      setError("Full Name must contain exactly one space between first and last name.");
      return;
    }
    try {
      await signup(formData);
      toast.success("Registration Successful! 🎉");
      setFormData({ name: "", email: "", password: "" });
      navigate('/register/ReligionDetails');
    } catch (err) {
      setError(err.toString());
      toast.error("Registration Failed! ❌");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/images/couples-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: "bold",
                    color: "#e75480" 
                  }}
                >
                  Begin Your Journey
                </Typography>

                <Grid container spacing={4}>
                  {/* Left Side - Text Content */}
                  <Grid item xs={12} md={6} sx={{ pr: { md: 4 } }}>
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      height: "100%", 
                      justifyContent: "center",
                      textAlign: "left",
                      py: 4
                    }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        New to EternalBond?
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
                        Create your account to begin your journey toward finding your forever partner.
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Right Side - Registration Form */}
                  <Grid item xs={12} md={6} sx={{ pl: { md: 4 }, borderLeft: { md: "1px solid #eee" } }}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputProps={{
                          sx: { borderRadius: 1 }
                        }}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        autoComplete="off"
                        InputProps={{
                          sx: { borderRadius: 1 }
                        }}
                      />
                      <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        autoComplete="new-password"
                        InputProps={{
                          sx: { borderRadius: 1 },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                          {error}
                        </Typography>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          py: 1.5,
                          bgcolor: "#e75480",
                          borderRadius: "30px",
                          "&:hover": {
                            bgcolor: "#d6436f"
                          }
                        }}
                      >
                        CREATE ACCOUNT
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;