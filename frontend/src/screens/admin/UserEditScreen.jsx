import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Paper, Grid, FormControlLabel, Checkbox } from '@mui/material'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'

const UserEditScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      return navigate('/admin/userlist')
    }
    if (!user?.name || user._id !== id) {
      dispatch(getUserDetails(id))
    } else {
      setName(user.name); setEmail(user.email); setIsAdmin(user.isAdmin)
    }
  }, [dispatch, navigate, id, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={5}>
        <Button component={Link} to='/admin/userlist' variant='outlined' sx={{ mb: 2 }}>Go Back</Button>
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom>Edit User</Typography>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
          {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
            <Box component='form' onSubmit={submitHandler}>
              <TextField fullWidth label='Name' value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
              <FormControlLabel control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />} label='Is Admin' sx={{ mb: 3 }} />
              <Button type='submit' variant='contained' fullWidth>Update</Button>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserEditScreen
