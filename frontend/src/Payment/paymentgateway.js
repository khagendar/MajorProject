import React, { useState } from 'react';
import axios from 'axios';

const PaymentGateway = () => {
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null);

  const handlePayment = async () => {
    // try {
    //   const orderData = {
    //     // Replace with your actual order details
    //     merchantId: 'YOUR_MERCHANT_ID',
    //     amount: amount,
    //     currency: 'INR',
    //     // Additional parameters as required by PhonePe
    //   };

    //   // Step 1: Create an order
    //   const orderResponse = await axios.post('https://api.phonepe.com/apis/hermes/pg/v1/order', orderData, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-VERIFY': 'YOUR_VERIFY_HEADER', // Replace with your verification header
    //     },
    //   });

    //   // Step 2: Handle the response
    //   if (orderResponse.data && orderResponse.data.success) {
    //     const paymentUrl = orderResponse.data.paymentUrl; // URL to redirect for payment
    //     window.location.href = paymentUrl; // Redirect to PhonePe payment page
    //   } else {
    //     setResponse('Payment initiation failed. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error during payment:', error);
    //   setResponse('An error occurred while processing the payment.');
    // }
  };

  return (
    <div>
      <h2>Payment Gateway</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay with PhonePe</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default PaymentGateway;
