import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, TextField, Button, Typography, Grid, InputAdornment,
  Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px', p: 3,
}

const inputStyle = {
  mb: 2.5,
  '& .MuiOutlinedInput-root': {
    color: 'white', borderRadius: '14px', fontSize: '0.9rem',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.6)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa', borderWidth: 2 },
    '& input': { padding: '15px 14px 15px 6px' },
    '& input::placeholder': { color: 'rgba(255,255,255,0.35)', opacity: 1 },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem',
    transform: 'translate(46px, 16px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
      color: 'rgba(255,255,255,0.45)',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
}

const tableCellStyle = {
  color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.85rem',
}

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success } = useSelector((state) => state.userUpdateProfile)
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector((state) => state.orderListMy)

  useEffect(() => {
    if (!userInfo) return navigate('/login')
    if (!user?.name) {
      dispatch(getUserDetails('profile'))
      dispatch(listMyOrders())
    } else {
      setName(user.name); setEmail(user.email)
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) return setMessage('Passwords do not match')
    setMessage(null)
    dispatch(updateUserProfile({ id: user._id, name, email, password }))
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant='h4' sx={{
        fontWeight: 700, mb: 4,
        background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>My Account</Typography>

      <Grid container spacing={4}>
        {/* Profile Form */}
        <Grid item xs={12} md={4}>
          <Box sx={glassBox}>
            {/* Avatar */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{
                width: 80, height: 80, mb: 2, fontSize: '2rem',
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                boxShadow: '0 8px 30px rgba(167,139,250,0.4)',
              }}>
                {name ? name[0].toUpperCase() : '?'}
              </Avatar>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{name}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{email}</Typography>
            </Box>

            <Typography variant='h6' sx={{ color: 'white', fontWeight: 600, mb: 2 }}>Edit Profile</Typography>

            {message && <Message severity='error'>{message}</Message>}
            {error && <Message severity='error'>{error}</Message>}
            {success && <Message severity='success'>Profile Updated Successfully!</Message>}
            {loading && <Loader />}

            <Box component='form' onSubmit={submitHandler}>
              <TextField fullWidth placeholder='Full Name' value={name}
                onChange={(e) => setName(e.target.value)} sx={inputStyle}
                InputProps={{ startAdornment: <InputAdornment position='start'><PersonIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment> }} />
              <TextField fullWidth placeholder='Email Address' type='email' value={email}
                onChange={(e) => setEmail(e.target.value)} sx={inputStyle}
                InputProps={{ startAdornment: <InputAdornment position='start'><EmailIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment> }} />
              <TextField fullWidth placeholder='New Password (leave blank to keep current)'
                type='password' value={password}
                onChange={(e) => setPassword(e.target.value)} sx={inputStyle}
                InputProps={{ startAdornment: <InputAdornment position='start'><LockIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment> }} />
              <TextField fullWidth placeholder='Confirm Password'
                type='password' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} sx={inputStyle}
                InputProps={{ startAdornment: <InputAdornment position='start'><LockIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }} /></InputAdornment> }} />

              <Button type='submit' fullWidth size='large' sx={{
                borderRadius: '14px', textTransform: 'none', fontWeight: 700, py: 1.5,
                color: '#ffffff',
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                boxShadow: '0 4px 20px rgba(167,139,250,0.3)',
                '&:hover': { opacity: 0.9, boxShadow: '0 6px 30px rgba(167,139,250,0.5)', transform: 'translateY(-1px)', color: '#ffffff' },
                transition: 'all 0.2s ease',
              }}>Update Profile</Button>
            </Box>
          </Box>
        </Grid>

        {/* Orders Table */}
        <Grid item xs={12} md={8}>
          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <ReceiptLongIcon sx={{ color: '#a78bfa' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 700 }}>My Orders</Typography>
            </Box>

            {loadingOrders ? <Loader /> : errorOrders ? <Message severity='error'>{errorOrders}</Message> : (
              orders?.length === 0 ? <Message>No orders yet.</Message> : (
                <Box sx={{ overflowX: 'auto' }}>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        {['Order ID', 'Date', 'Total', 'Paid', 'Delivered', ''].map((h) => (
                          <TableCell key={h} sx={{ ...tableCellStyle, color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders?.map((order) => (
                        <TableRow key={order._id} sx={{ '&:hover': { background: 'rgba(255,255,255,0.03)' } }}>
                          <TableCell sx={tableCellStyle}>{order._id.substring(0, 10)}...</TableCell>
                          <TableCell sx={tableCellStyle}>{order.createdAt?.substring(0, 10)}</TableCell>
                          <TableCell sx={{ ...tableCellStyle, color: '#a78bfa', fontWeight: 600 }}>${order.totalPrice}</TableCell>
                          <TableCell sx={tableCellStyle}>
                            {order.isPaid
                              ? <Chip icon={<CheckIcon />} label={order.paidAt?.substring(0, 10)} size='small' sx={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)', fontSize: '0.75rem' }} />
                              : <Chip icon={<CloseIcon />} label='Not Paid' size='small' sx={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', fontSize: '0.75rem' }} />
                            }
                          </TableCell>
                          <TableCell sx={tableCellStyle}>
                            {order.isDelivered
                              ? <Chip icon={<CheckIcon />} label='Delivered' size='small' sx={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)', fontSize: '0.75rem' }} />
                              : <Chip icon={<CloseIcon />} label='Pending' size='small' sx={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', fontSize: '0.75rem' }} />
                            }
                          </TableCell>
                          <TableCell sx={tableCellStyle}>
                            <Button size='small' href={`/order/${order._id}`} sx={{
                              borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem',
                              border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa',
                              '&:hover': { background: 'rgba(167,139,250,0.15)' },
                            }}>Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileScreen
