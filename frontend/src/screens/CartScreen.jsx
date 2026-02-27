import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid, Typography, Button, Select, MenuItem,
  Box, Divider, IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/shared/Message'

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
  p: 3,
}

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

  return (
    <Box sx={{ py: 4 }}>
      <Button component={Link} to='/' startIcon={<ArrowBackIcon />} sx={{
        mb: 3, borderRadius: '12px', textTransform: 'none',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
        color: 'white', '&:hover': { background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.4)' },
      }}>Continue Shopping</Button>

      <Typography variant='h4' sx={{
        fontWeight: 700, mb: 4,
        background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>🛒 Shopping Cart</Typography>

      {cartItems.length === 0 ? (
        <Message>Your cart is empty. <Link to='/' style={{ color: '#a78bfa' }}>Go Shopping</Link></Message>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cartItems.map((item) => (
                <Box key={item.product} sx={{
                  ...glassBox, display: 'flex', alignItems: 'center', gap: 2,
                  transition: 'all 0.3s', p: 2,
                  '&:hover': { border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 8px 30px rgba(167,139,250,0.1)' },
                }}>
                  {/* Image */}
                  <Box sx={{ width: 90, height: 90, borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>

                  {/* Name */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography component={Link} to={`/product/${item.product}`} sx={{
                      textDecoration: 'none', color: 'white', fontWeight: 600,
                      '&:hover': { color: '#a78bfa' },
                    }}>{item.name}</Typography>
                    <Typography sx={{ color: '#a78bfa', fontWeight: 700, mt: 0.5 }}>${item.price}</Typography>
                  </Box>

                  {/* Qty */}
                  <Select
                    size='small' value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    sx={{
                      color: 'white', borderRadius: '10px', minWidth: 70,
                      '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(167,139,250,0.5)' },
                      '.MuiSvgIcon-root': { color: 'white' },
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                    ))}
                  </Select>

                  {/* Subtotal */}
                  <Typography sx={{ color: 'white', fontWeight: 600, minWidth: 70, textAlign: 'right' }}>
                    ${(item.qty * item.price).toFixed(2)}
                  </Typography>

                  {/* Delete */}
                  <IconButton onClick={() => dispatch(removeFromCart(item.product))} sx={{
                    color: 'rgba(239,68,68,0.7)', background: 'rgba(239,68,68,0.1)',
                    borderRadius: '10px',
                    '&:hover': { background: 'rgba(239,68,68,0.2)', color: '#f87171' },
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Box sx={{ ...glassBox, position: 'sticky', top: 80 }}>
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 700, mb: 2 }}>Order Summary</Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Items ({totalItems}):</Typography>
                <Typography sx={{ color: 'white' }}>${totalPrice}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Shipping:</Typography>
                <Typography sx={{ color: Number(totalPrice) > 100 ? '#34d399' : 'white' }}>
                  {Number(totalPrice) > 100 ? 'FREE' : '$10.00'}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Total:</Typography>
                <Typography sx={{
                  fontWeight: 700, fontSize: '1.2rem',
                  background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  ${(Number(totalPrice) > 100 ? Number(totalPrice) : Number(totalPrice) + 10).toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant='contained' fullWidth size='large'
                startIcon={<ShoppingCartCheckoutIcon />}
                disabled={cartItems.length === 0}
                onClick={() => navigate('/login?redirect=shipping')}
                sx={{
                  borderRadius: '12px', textTransform: 'none', fontWeight: 600, py: 1.5,
                  background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                  '&:hover': { opacity: 0.9, boxShadow: '0 0 30px rgba(167,139,250,0.5)' },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default CartScreen
