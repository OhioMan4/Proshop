import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button, Box, Paper, Divider, List, ListItem } from '@mui/material'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/shared/CheckoutSteps'
import Message from '../components/shared/Message'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
  const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10)
  const taxPrice = addDecimals(Number((0.15 * Number(itemsPrice)).toFixed(2)))
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  const { order, success, error } = useSelector((state) => state.orderCreate)

  useEffect(() => {
    if (success) navigate(`/order/${order._id}`)
  }, [navigate, success, order])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }))
  }

  return (
    <>
      <CheckoutSteps activeStep={3} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant='h6' gutterBottom>Shipping</Typography>
            <Typography>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</Typography>
          </Paper>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant='h6' gutterBottom>Payment Method</Typography>
            <Typography>Method: {cart.paymentMethod}</Typography>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>Order Items</Typography>
            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
              <List>
                {cart.cartItems.map((item, index) => (
                  <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={2}><img src={item.image} alt={item.name} style={{ width: '100%' }} /></Grid>
                      <Grid item xs={6}><Typography component={Link} to={`/product/${item.product}`} sx={{ textDecoration: 'none' }}>{item.name}</Typography></Grid>
                      <Grid item xs={4}><Typography>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</Typography></Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h5' gutterBottom>Order Summary</Typography>
            <Divider />
            {[['Items', itemsPrice], ['Shipping', shippingPrice], ['Tax', taxPrice], ['Total', totalPrice]].map(([label, value]) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography>{label}:</Typography>
                <Typography fontWeight={label === 'Total' ? 'bold' : 'normal'}>${value}</Typography>
              </Box>
            ))}
            {error && <Message severity='error'>{error}</Message>}
            <Button variant='contained' fullWidth size='large' sx={{ mt: 2 }} disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default PlaceOrderScreen
