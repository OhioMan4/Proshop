import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { listUsers, deleteUser } from '../../actions/userActions'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, users } = useSelector((state) => state.userList)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success: successDelete } = useSelector((state) => state.userDelete)

  useEffect(() => {
    if (userInfo?.isAdmin) dispatch(listUsers())
    else navigate('/login')
  }, [dispatch, navigate, userInfo, successDelete])

  return (
    <>
      <Typography variant='h4' gutterBottom>Users</Typography>
      {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>NAME</TableCell><TableCell>EMAIL</TableCell>
              <TableCell>ADMIN</TableCell><TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                <TableCell>{user.isAdmin ? <CheckIcon color='success' /> : <CloseIcon color='error' />}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/admin/user/${user._id}/edit`} size='small'><EditIcon /></IconButton>
                  <IconButton onClick={() => dispatch(deleteUser(user._id))} size='small' color='error'><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
