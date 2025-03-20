import React, { useState } from "react";
import { 
    Box, Typography, TextField, Button, IconButton, 
    InputAdornment, Tabs, Tab 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../routes/AuthContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedTab, setSelectedTab] = useState("user"); // Default to "user"

    const { login, adminLogin } = useAuth(); // Assuming you have an admin login function
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (selectedTab === "user") {
                response = await login(formData);
                toast.success("User Login Successful! 🎉");
                navigate('/Home');
            } else {
                response = await login(formData);
                toast.success("Admin Login Successful! 🔥");
                navigate('/AdminHome');
            }
            console.log("Login successful:", response);
        } catch (err) {
            toast.error("Login Failed! ❌");
            setError(err.toString());
        }
    };

    const forgotPassword = () => {
        navigate('/forgotpassword');
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden"
            }}
        >
            {/* Left Side: Admin & User Selection */}
            <Box
                sx={{
                    width: "150px",
                    backgroundColor: "primary.main",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                }}
            >
                <Typography variant="h6" align="center" sx={{ mb: 2 }}>Login As</Typography>
                <Tabs
                    orientation="vertical"
                    value={selectedTab}
                    onChange={(e, newValue) => setSelectedTab(newValue)}
                    textColor="inherit"
                    indicatorColor="secondary"
                >
                    <Tab label="User" value="user" />
                    <Tab label="Admin" value="admin" />
                </Tabs>
            </Box>

            {/* Right Side: Login Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 350,
                    padding: 4,
                }}
            >
                <Typography variant="h5" sx={{ mb: 2 }} color="textPrimary" align="center">
                    {selectedTab === "user" ? "User Login" : "Admin Login"}
                </Typography>

                {error && (
                    <Typography color="error" sx={{ mb: 2 }} align="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleChange}
                    value={formData.email}
                    required
                    autoComplete="off"
                />

                <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleChange}
                    value={formData.password}
                    required
                    autoComplete="new-password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: "primary.main", cursor: "pointer", mb: 2 }}
                    onClick={forgotPassword}
                >
                    Forgot Password?
                </Typography>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </Box>
        </Box>
    );
}
