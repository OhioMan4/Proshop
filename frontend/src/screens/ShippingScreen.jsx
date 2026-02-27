import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/shared/CheckoutSteps'

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5}>
        <CheckoutSteps activeStep={1} />
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom>Shipping</Typography>
          <Box component='form' onSubmit={submitHandler}>
            <TextField fullWidth label='Address' value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label='City' value={city} onChange={(e) => setCity(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} sx={{ mb: 2 }} required />
            <TextField fullWidth label='Country' value={country} onChange={(e) => setCountry(e.target.value)} sx={{ mb: 3 }} required />
            <Button type='submit' variant='contained' fullWidth size='large'>Continue</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ShippingScreen
