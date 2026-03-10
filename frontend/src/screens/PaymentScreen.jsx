import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, Grid, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/shared/CheckoutSteps'

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '24px', p: { xs: 3, md: 5 },
}

const paymentOptions = [
  { value: 'PayPal', label: 'PayPal', icon: '🅿️', desc: 'Pay with PayPal or Credit Card' },
  { value: 'Stripe', label: 'Stripe', icon: '💳', desc: 'Pay with Stripe' },
  { value: 'Demo', label: 'Demo Pay', icon: '🎮', desc: 'Simulate payment (no real charge)' },
]

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  if (!shippingAddress?.address) navigate('/shipping')

  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState('Demo')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <Grid container justifyContent='center' sx={{ py: 4 }}>
      <Grid item xs={12} sm={10} md={6} lg={5}>
        <CheckoutSteps activeStep={2} />
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant='h4' sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Payment Method</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', mt: 1, fontSize: '0.9rem' }}>
            Choose how you want to pay
          </Typography>
        </Box>

        <Box sx={glassBox}>
          <Box component='form' onSubmit={submitHandler}>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              {paymentOptions.map((opt) => (
                <Box key={opt.value} onClick={() => setPaymentMethod(opt.value)} sx={{
                  mb: 2, p: 2, borderRadius: '16px', cursor: 'pointer',
                  border: `2px solid ${paymentMethod === opt.value ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.08)'}`,
                  background: paymentMethod === opt.value ? 'rgba(167,139,250,0.1)' : 'rgba(255,255,255,0.03)',
                  transition: 'all 0.2s ease',
                  '&:hover': { border: '2px solid rgba(167,139,250,0.4)', background: 'rgba(167,139,250,0.07)' },
                  display: 'flex', alignItems: 'center', gap: 2,
                }}>
                  <FormControlLabel
                    value={opt.value}
                    control={<Radio sx={{
                      color: 'rgba(255,255,255,0.3)',
                      '&.Mui-checked': { color: '#a78bfa' },
                    }} />}
                    label=''
                    sx={{ m: 0 }}
                  />
                  <Typography sx={{ fontSize: '1.5rem' }}>{opt.icon}</Typography>
                  <Box>
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>{opt.label}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{opt.desc}</Typography>
                  </Box>
                  {opt.value === 'Demo' && (
                    <Box sx={{
                      ml: 'auto', px: 1.5, py: 0.5, borderRadius: '8px',
                      background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)',
                    }}>
                      <Typography sx={{ color: '#fbbf24', fontSize: '0.7rem', fontWeight: 600 }}>DEMO</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </RadioGroup>

            <Button type='submit' fullWidth size='large' endIcon={<ArrowForwardIcon />} sx={{
              mt: 1, borderRadius: '14px', textTransform: 'none',
              fontWeight: 700, py: 1.6, fontSize: '1rem', color: '#ffffff',
              background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
              boxShadow: '0 4px 20px rgba(167,139,250,0.3)',
              '&:hover': { opacity: 0.9, boxShadow: '0 6px 30px rgba(167,139,250,0.5)', transform: 'translateY(-1px)', color: '#ffffff' },
              transition: 'all 0.2s ease',
            }}>Continue to Review</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PaymentScreen
