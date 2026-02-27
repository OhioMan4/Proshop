import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button, Box, Paper, Divider, List, ListItem } from '@mui/material'
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { loading, error, order } = useSelector((state) => state.orderDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading: loadingDeliver, success: successDeliver } = useSelector((state) => state.orderDeliver)

  useEffect(() => {
    if (!order || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(id))
    }
  }, [dispatch, id, successDeliver, order])

  const deliverHandler = () => dispatch(deliverOrder(order))

  return loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
    <>
      <Typography variant='h4' gutterBottom>Order {order._id}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant='h6' gutterBottom>Shipping</Typography>
            <Typography><strong>{order.user?.name}</strong> — {order.user?.email}</Typography>
            <Typography>{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</Typography>
            {order.isDelivered ? <Message severity='success'>Delivered on {order.deliveredAt?.substring(0, 10)}</Message> : <Message severity='error'>Not Delivered</Message>}
          </Paper>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant='h6' gutterBottom>Payment</Typography>
            <Typography>Method: {order.paymentMethod}</Typography>
            {order.isPaid ? <Message severity='success'>Paid on {order.paidAt?.substring(0, 10)}</Message> : <Message severity='error'>Not Paid</Message>}
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>Order Items</Typography>
            <List>
              {order.orderItems?.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={2}><img src={item.image} alt={item.name} style={{ width: '100%' }} /></Grid>
                    <Grid item xs={6}><Typography component={Link} to={`/product/${item.product}`} sx={{ textDecoration: 'none' }}>{item.name}</Typography></Grid>
                    <Grid item xs={4}><Typography>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</Typography></Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h5' gutterBottom>Order Summary</Typography>
            <Divider />
            {[['Items', order.itemsPrice], ['Shipping', order.shippingPrice], ['Tax', order.taxPrice], ['Total', order.totalPrice]].map(([label, value]) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography>{label}:</Typography>
                <Typography fontWeight={label === 'Total' ? 'bold' : 'normal'}>${value}</Typography>
              </Box>
            ))}
            {userInfo?.isAdmin && !order.isDelivered && (
              <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={deliverHandler} disabled={loadingDeliver}>
                Mark As Delivered
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderScreen
