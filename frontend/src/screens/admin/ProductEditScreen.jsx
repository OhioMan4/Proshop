import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material'
import axios from 'axios'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'

const ProductEditScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, product } = useSelector((state) => state.productDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.productUpdate)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      return navigate('/admin/productlist')
    }
    if (!product?.name || product._id !== id) {
      dispatch(listProductDetails(id))
    } else {
      setName(product.name); setPrice(product.price); setImage(product.image)
      setBrand(product.brand); setCategory(product.category)
      setCountInStock(product.countInStock); setDescription(product.description)
    }
  }, [dispatch, navigate, id, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ _id: id, name, price, image, brand, category, countInStock, description }))
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Button component={Link} to='/admin/productlist' variant='outlined' sx={{ mb: 2 }}>Go Back</Button>
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' gutterBottom>Edit Product</Typography>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
          {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
            <Box component='form' onSubmit={submitHandler}>
              <TextField fullWidth label='Name' value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label='Price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label='Image URL' value={image} onChange={(e) => setImage(e.target.value)} sx={{ mb: 1 }} />
              <Button variant='outlined' component='label' sx={{ mb: 2 }}>
                Upload Image <input type='file' hidden onChange={uploadFileHandler} />
              </Button>
              {uploading && <Loader />}
              <TextField fullWidth label='Brand' value={brand} onChange={(e) => setBrand(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label='Category' value={category} onChange={(e) => setCategory(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label='Count In Stock' type='number' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth multiline rows={3} label='Description' value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 3 }} />
              <Button type='submit' variant='contained' fullWidth>Update</Button>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ProductEditScreen
