import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Grid, InputAdornment, IconButton } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { login } from '../actions/userActions'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'

const glassStyle = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '24px',
  p: { xs: 3, md: 5 },
}

const inputStyle = {
  mb: 2.5,
  '& .MuiOutlinedInput-root': {
    color: 'white', borderRadius: '14px', fontSize: '0.95rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.6)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa', borderWidth: 2 },
    '& input': { padding: '15px 14px 15px 6px' },
    '& input::placeholder': { color: 'rgba(255,255,255,0.35)', opacity: 1 },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem',
    transform: 'translate(46px, 16px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
      color: 'rgba(255,255,255,0.45)',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.3)' },
}

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => { if (userInfo) navigate(redirect) }, [navigate, userInfo, redirect])

  const submitHandler = (e) => { e.preventDefault(); dispatch(login(email, password)) }

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: '80vh', py: 4 }}>
      <Grid item xs={12} sm={9} md={5} lg={4}>
        {/* Logo / Title */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant='h3' sx={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}>
            👟 ProShop
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', mt: 1, fontSize: '0.95rem' }}>
            Sign in to your account
          </Typography>
        </Box>

        <Box sx={glassStyle}>
          <Typography variant='h5' sx={{ fontWeight: 700, color: 'white', mb: 3, textAlign: 'center' }}>
            Welcome Back
          </Typography>

          {error && <Message severity='error'>{error}</Message>}
          {loading && <Loader />}

          <Box component='form' onSubmit={submitHandler}>
            <TextField
              fullWidth type='email' placeholder='Email Address'
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={inputStyle} required
              InputProps={{
                startAdornment: <InputAdornment position='start'><EmailIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment>,
              }}
            />
            <TextField
              fullWidth placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              value={password} onChange={(e) => setPassword(e.target.value)}
              sx={inputStyle} required
              InputProps={{
                startAdornment: <InputAdornment position='start'><LockIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end' sx={{ color: 'rgba(255,255,255,0.3)' }}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type='submit' fullWidth size='large' sx={{
              mt: 1, mb: 2, borderRadius: '14px', textTransform: 'none',
              fontWeight: 700, py: 1.6, fontSize: '1rem',
              color: '#ffffff',
              background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
              boxShadow: '0 4px 20px rgba(167,139,250,0.3)',
              '&:hover': { opacity: 0.92, boxShadow: '0 6px 30px rgba(167,139,250,0.5)', transform: 'translateY(-1px)', color: '#ffffff' },
              transition: 'all 0.2s ease',
            }}>
              Sign In
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', pt: 1, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              New Customer?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>
                Create Account →
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginScreen
