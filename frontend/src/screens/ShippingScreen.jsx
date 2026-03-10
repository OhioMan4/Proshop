import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Grid, InputAdornment } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox'
import PublicIcon from '@mui/icons-material/Public'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/shared/CheckoutSteps'

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '24px', p: { xs: 3, md: 5 },
}

const inputStyle = {
  mb: 2.5,
  '& .MuiOutlinedInput-root': {
    color: 'white', borderRadius: '14px', fontSize: '0.95rem',
    background: 'rgba(255,255,255,0.04)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.6)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa', borderWidth: 2 },
    '& input': { padding: '15px 14px 15px 6px' },
    '& input::placeholder': { color: 'rgba(255,255,255,0.35)', opacity: 1 },
  },
}

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.userLogin)
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // redirect if not logged in
  React.useEffect(() => {
    if (!userInfo) navigate('/login?redirect=shipping')
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <Grid container justifyContent='center' sx={{ py: 4 }}>
      <Grid item xs={12} sm={10} md={6} lg={5}>
        <CheckoutSteps activeStep={1} />
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant='h4' sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Shipping Address</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', mt: 1, fontSize: '0.9rem' }}>
            Where should we deliver your order?
          </Typography>
        </Box>

        <Box sx={glassBox}>
          <Box component='form' onSubmit={submitHandler}>
            <TextField fullWidth placeholder='Street Address' value={address}
              onChange={(e) => setAddress(e.target.value)} sx={inputStyle} required
              InputProps={{ startAdornment: <InputAdornment position='start'><HomeIcon sx={{ color: 'rgba(167,139,250,0.6)' }} /></InputAdornment> }}
            />
            <TextField fullWidth placeholder='City' value={city}
              onChange={(e) => setCity(e.target.value)} sx={inputStyle} required
              InputProps={{ startAdornment: <InputAdornment position='start'><LocationCityIcon sx={{ color: 'rgba(167,139,250,0.6)' }} /></InputAdornment> }}
            />
            <TextField fullWidth placeholder='Postal Code' value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)} sx={inputStyle} required
              InputProps={{ startAdornment: <InputAdornment position='start'><MarkunreadMailboxIcon sx={{ color: 'rgba(167,139,250,0.6)' }} /></InputAdornment> }}
            />
            <TextField fullWidth placeholder='Country' value={country}
              onChange={(e) => setCountry(e.target.value)} sx={{ ...inputStyle, mb: 3 }} required
              InputProps={{ startAdornment: <InputAdornment position='start'><PublicIcon sx={{ color: 'rgba(167,139,250,0.6)' }} /></InputAdornment> }}
            />
            <Button type='submit' fullWidth size='large' endIcon={<ArrowForwardIcon />} sx={{
              borderRadius: '14px', textTransform: 'none', fontWeight: 700,
              py: 1.6, fontSize: '1rem', color: '#ffffff',
              background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
              boxShadow: '0 4px 20px rgba(167,139,250,0.3)',
              '&:hover': { opacity: 0.9, boxShadow: '0 6px 30px rgba(167,139,250,0.5)', transform: 'translateY(-1px)', color: '#ffffff' },
              transition: 'all 0.2s ease',
            }}>Continue to Payment</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ShippingScreen
