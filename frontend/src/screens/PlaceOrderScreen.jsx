import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button, Box, Divider, List, ListItem, Chip } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/shared/CheckoutSteps'
import Message from '../components/shared/Message'
import Loader from '../components/shared/Loader'

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px', p: 3, mb: 3,
}

const summaryRows = (itemsPrice, shippingPrice, taxPrice) => [
  { label: 'Items', value: `$${itemsPrice}` },
  { label: 'Shipping', value: Number(shippingPrice) === 0 ? 'FREE' : `$${shippingPrice}` },
  { label: 'Tax (15%)', value: `$${taxPrice}` },
]

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { loading, order, success, error } = useSelector((state) => state.orderCreate)

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
  const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10)
  const taxPrice = addDecimals(Number((0.15 * Number(itemsPrice)).toFixed(2)))
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  useEffect(() => {
    if (success) navigate(`/order/${order._id}`)
  }, [navigate, success, order])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice, shippingPrice, taxPrice, totalPrice,
    }))
  }

  return (
    <Box sx={{ py: 4 }}>
      <CheckoutSteps activeStep={3} />

      <Typography variant='h4' sx={{
        fontWeight: 700, mb: 4,
        background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Review Your Order</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Shipping */}
          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <LocalShippingIcon sx={{ color: '#a78bfa' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600 }}>Shipping Address</Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Typography>
          </Box>

          {/* Payment */}
          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PaymentIcon sx={{ color: '#60a5fa' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600 }}>Payment Method</Typography>
            </Box>
            <Chip label={cart.paymentMethod} sx={{
              background: 'rgba(96,165,250,0.15)',
              border: '1px solid rgba(96,165,250,0.3)',
              color: '#60a5fa', fontWeight: 600,
            }} />
          </Box>

          {/* Order Items */}
          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <ShoppingBagIcon sx={{ color: '#34d399' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600 }}>Order Items</Typography>
            </Box>
            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
              <List disablePadding>
                {cart.cartItems.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{
                    py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.06)',
                    '&:last-child': { borderBottom: 'none' },
                  }}>
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={2}>
                        <Box sx={{ borderRadius: '10px', overflow: 'hidden' }}>
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '60px', objectFit: 'cover' }} />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={Link} to={`/product/${item.product}`}
                          sx={{ textDecoration: 'none', color: 'white', fontWeight: 500,
                            '&:hover': { color: '#a78bfa' } }}>
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={{ color: '#a78bfa', fontWeight: 600, textAlign: 'right' }}>
                          {item.qty} × ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Box sx={{ ...glassBox, position: 'sticky', top: 80, mb: 0 }}>
            <Typography variant='h6' sx={{ color: 'white', fontWeight: 700, mb: 2 }}>Order Summary</Typography>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

            {summaryRows(itemsPrice, shippingPrice, taxPrice).map(({ label, value }) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>{label}:</Typography>
                <Typography sx={{ color: value === 'FREE' ? '#34d399' : 'white', fontWeight: 500 }}>{value}</Typography>
              </Box>
            ))}

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Total:</Typography>
              <Typography sx={{
                fontWeight: 800, fontSize: '1.3rem',
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>${totalPrice}</Typography>
            </Box>

            {/* Demo payment notice */}
            <Box sx={{
              background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.25)',
              borderRadius: '12px', p: 1.5, mb: 2,
              display: 'flex', alignItems: 'center', gap: 1,
            }}>
              <CheckCircleIcon sx={{ color: '#fbbf24', fontSize: '1rem' }} />
              <Typography sx={{ color: '#fbbf24', fontSize: '0.8rem' }}>
                Demo mode — no real payment required
              </Typography>
            </Box>

            {error && <Message severity='error'>{error}</Message>}
            {loading && <Loader />}

            <Button
              variant='contained' fullWidth size='large'
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              sx={{
                borderRadius: '14px', textTransform: 'none',
                fontWeight: 700, py: 1.6, fontSize: '1rem',
                color: '#ffffff',
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                boxShadow: '0 4px 20px rgba(167,139,250,0.3)',
                '&:hover': { opacity: 0.9, boxShadow: '0 6px 30px rgba(167,139,250,0.5)', transform: 'translateY(-1px)', color: '#ffffff' },
                '&:disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
                transition: 'all 0.2s ease',
              }}
            >
              Place Order &rarr;
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PlaceOrderScreen
