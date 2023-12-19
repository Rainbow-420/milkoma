import { btnBackground, btnBackgroundHover, fontBold, staticFiles } from "../../components/Constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../axios";
import { getDateString, headers } from "../../utils/appHelper";
import { useDispatch } from "react-redux";
import { Box, Button, Card, CardMedia, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { toast } from "react-toastify";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe, 
    useElements
  } from "@stripe/react-stripe-js";


export const TestPayment = () => {
    const navigate = useNavigate();
    const { cid } = useParams();
    const contractId = cid??'';

    const stripe = useStripe();
    const elements = useElements();
  
    const handlePayment = async (event: any) => {
  
      try {
        // Make a POST request to your backend to get the client_secret
        const response = await axios.post(
            `${API}/api/stripe_payment/${contractId}`,
          { amount: 20000 }, headers()
        );
            console.log('response - ', response);
        // if (response.status === 200) {
        //     const cardElement = elements?.getElement(CardNumberElement);

        //     if (!cardElement) {
        //       // Handle the case where the card element is not available or undefined
        //       console.error('Card element is not available');
        //       return; // Or perform appropriate error handling
        //     }
            
        //     // Now you can proceed to use the card element
        //     const confirmPayment = await stripe?.confirmCardPayment(
        //       response.data.client_secret,
        //       {
        //         payment_method: {
        //           card: cardElement,
        //         },
        //       }
        //     );
  
        //   if (confirmPayment?.paymentIntent?.status === 'succeeded') {
        //     console.log('Payment confirmed!');
        //     // Handle successful payment here
        //   } else if (confirmPayment?.paymentIntent?.status === 'requires_action') {
        //     // Handle additional authentication steps if required
        //     // For example, use confirmCardPayment with the handleCardAction option
        //   } else {
        //     console.log('Payment failed!');
        //     // Handle payment failure or other statuses here
        //   }
        // }
      } catch (error) {
        console.error('Error processing payment:', error);
        // Handle error scenarios here
      }
    };
    return(

            <form>
            <CardNumberElement/>
            <CardExpiryElement />
            <CardCvcElement />    
            <button onClick={handlePayment}>Confirm Payment</button>
            </form>

    )
}