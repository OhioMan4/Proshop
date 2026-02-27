import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { listOrders } from '../../actions/orderActions'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, orders } = useSelector((state) => state.orderList)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userInfo?.isAdmin) dispatch(listOrders())
    else navigate('/login')
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <Typography variant='h4' gutterBottom>Orders</Typography>
      {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>USER</TableCell><TableCell>DATE</TableCell>
              <TableCell>TOTAL</TableCell><TableCell>PAID</TableCell><TableCell>DELIVERED</TableCell><TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user?.name}</TableCell>
                <TableCell>{order.createdAt?.substring(0, 10)}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.isPaid ? <CheckIcon color='success' /> : <CloseIcon color='error' />}</TableCell>
                <TableCell>{order.isDelivered ? <CheckIcon color='success' /> : <CloseIcon color='error' />}</TableCell>
                <TableCell><Button size='small' variant='outlined' component={Link} to={`/order/${order._id}`}>Details</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
