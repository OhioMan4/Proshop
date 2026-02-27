import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, Paper, Grid, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/shared/CheckoutSteps'

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  if (!shippingAddress?.address) navigate('/shipping')

  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5}>
        <CheckoutSteps activeStep={2} />
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom>Payment Method</Typography>
          <Box component='form' onSubmit={submitHandler}>
            <FormControl component='fieldset' sx={{ mb: 3 }}>
              <FormLabel component='legend'>Select Method</FormLabel>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value='PayPal' control={<Radio />} label='PayPal or Credit Card' />
                <FormControlLabel value='Stripe' control={<Radio />} label='Stripe' />
              </RadioGroup>
            </FormControl>
            <Button type='submit' variant='contained' fullWidth size='large'>Continue</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default PaymentScreen
