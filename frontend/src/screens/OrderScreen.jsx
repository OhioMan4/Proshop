import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button, Box, Divider, List, ListItem, Chip } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaymentIcon from '@mui/icons-material/Payment'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { getOrderDetails, deliverOrder, payOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px', p: 3, mb: 3,
}

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, error, order } = useSelector((state) => state.orderDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading: loadingDeliver, success: successDeliver } = useSelector((state) => state.orderDeliver)
  const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay)

  useEffect(() => {
    if (!order || successDeliver || successPay || order._id !== id) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, id, successDeliver, successPay, order])

  const deliverHandler = () => dispatch(deliverOrder(order))

  const demoPayHandler = () => {
    dispatch(payOrder(id, {
      id: `DEMO-${Date.now()}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      payer: { email_address: userInfo.email },
    }))
  }

  if (loading) return <Loader />
  if (error) return <Message severity='error'>{error}</Message>
  if (!order) return null

  const orderRows = [
    { label: 'Items', value: `$${order.itemsPrice}` },
    { label: 'Shipping', value: Number(order.shippingPrice) === 0 ? 'FREE' : `$${order.shippingPrice}` },
    { label: 'Tax', value: `$${order.taxPrice}` },
  ]

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant='h4' sx={{
        fontWeight: 700, mb: 1,
        background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>Order Details</Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', mb: 4, fontSize: '0.85rem' }}>
        Order ID: {order._id}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <LocalShippingIcon sx={{ color: '#a78bfa' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600 }}>Shipping</Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
              <strong style={{ color: 'white' }}>{order.user?.name}</strong> — {order.user?.email}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
              {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
              {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
            </Typography>
            {order.isDelivered
              ? <Chip icon={<LocalShippingOutlinedIcon />} label={`Delivered on ${order.deliveredAt?.substring(0, 10)}`}
                  sx={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }} />
              : <Chip icon={<CancelIcon />} label='Not Delivered'
                  sx={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }} />
            }
          </Box>

          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PaymentIcon sx={{ color: '#60a5fa' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600 }}>Payment</Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>Method: {order.paymentMethod}</Typography>
            {order.isPaid
              ? <Chip icon={<CheckCircleIcon />} label={`Paid on ${order.paidAt?.substring(0, 10)}`}
                  sx={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }} />
              : <Chip icon={<CancelIcon />} label='Not Paid'
                  sx={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }} />
            }
          </Box>

          <Box sx={glassBox}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <ShoppingBagIcon sx={{ color: '#34d399' }} />
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600 }}>Order Items</Typography>
            </Box>
            <List disablePadding>
              {order.orderItems?.map((item, index) => (
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
                        sx={{ textDecoration: 'none', color: 'white', '&:hover': { color: '#a78bfa' } }}>
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ color: '#a78bfa', fontWeight: 600, textAlign: 'right' }}>
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ ...glassBox, position: 'sticky', top: 80, mb: 0 }}>
            <Typography variant='h6' sx={{ color: 'white', fontWeight: 700, mb: 2 }}>Order Summary</Typography>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

            {orderRows.map(({ label, value }) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>{label}:</Typography>
                <Typography sx={{ color: value === 'FREE' ? '#34d399' : 'white' }}>{value}</Typography>
              </Box>
            ))}

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Total:</Typography>
              <Typography sx={{
                fontWeight: 800, fontSize: '1.3rem',
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>${order.totalPrice}</Typography>
            </Box>

            {!order.isPaid && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{
                  background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)',
                  borderRadius: '12px', p: 1.5, mb: 2, display: 'flex', alignItems: 'center', gap: 1,
                }}>
                  <CheckCircleIcon sx={{ color: '#fbbf24', fontSize: '1rem' }} />
                  <Typography sx={{ color: '#fbbf24', fontSize: '0.8rem' }}>Demo mode — click to simulate payment</Typography>
                </Box>
                {loadingPay && <Loader />}
                <Button fullWidth size='large' onClick={demoPayHandler} sx={{
                  borderRadius: '14px', textTransform: 'none', fontWeight: 700,
                  py: 1.5, color: '#ffffff',
                  background: 'linear-gradient(90deg, #34d399, #059669)',
                  boxShadow: '0 4px 20px rgba(52,211,153,0.3)',
                  '&:hover': { opacity: 0.9, transform: 'translateY(-1px)', color: '#ffffff' },
                  transition: 'all 0.2s ease',
                }}>
                  Simulate Payment
                </Button>
              </Box>
            )}

            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <>
                {loadingDeliver && <Loader />}
                <Button fullWidth size='large' onClick={deliverHandler} sx={{
                  borderRadius: '14px', textTransform: 'none', fontWeight: 700,
                  py: 1.5, color: '#ffffff',
                  background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                  '&:hover': { opacity: 0.9, transform: 'translateY(-1px)', color: '#ffffff' },
                  transition: 'all 0.2s ease',
                }}>
                  Mark As Delivered
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderScreen
