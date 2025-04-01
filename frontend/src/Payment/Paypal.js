import React, { useEffect, useRef } from "react";
import { Card, CardContent, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useAuth } from "../routes/AuthContex";
import { useNavigate } from "react-router-dom";

const Paypal = () => {
    const navigate=useNavigate();
  const paypal = useRef(null);
  const subscriptionAmount = 30.0;
  const subscriptionName = "Eternal Bond Subscription";
    const auth=useAuth();
    const userId=auth?.user?.id
  useEffect(() => {
    if (paypal.current.hasChildNodes()) return; // Prevents multiple renders

    window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: subscriptionName,
              amount: {
                currency_code: "USD",
                value: subscriptionAmount,
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log("Successful order", order);
        try {
            console.log(userId)
            // Send POST request to the backend
            const response = await axios.post("http://localhost:5000/subscribeuser", {
              userId: userId
            });
      
            // If successful, show success Toast message
            if (response.status === 201) {
              toast.success("Payment Successfull"); // Show success message from server
              navigate("/home")
            }
        } catch (error) {
            // Handle errors
            console.error("Error subscribing user:", error);
            toast.error("An error occurred. Please try again.");
        }
      },
      onError: (err) => {
        console.log("Error", err);
        toast.error("Payment failed");
      },
    }).render(paypal.current);
  }, []);

  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "background.default" }}>
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "primary.main", marginBottom: 2 }}>
            {subscriptionName}
          </Typography>
          <Typography sx={{ color: "text.secondary", marginBottom: 2 }}>
            Premium access to eternal bonds
          </Typography>
          <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold", color: "text.primary", marginBottom: 4 }}>
            ${subscriptionAmount.toFixed(2)} <span style={{ fontSize: "1rem" }}>/month</span>
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
            Gain access to exclusive features and benefits with our premium subscription.
          </Typography>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 4 }}>
            <div ref={paypal}></div>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Paypal;