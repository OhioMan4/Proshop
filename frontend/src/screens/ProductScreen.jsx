import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid, Typography, Button, Select, MenuItem, FormControl,
  InputLabel, Box, Divider, TextField, List, ListItem, Chip,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Rating from '../components/shared/Rating'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=No+Image'
const getImagePath = (image) => {
  if (!image) return FALLBACK_IMAGE
  if (image.startsWith('http')) return image
  return `/images/${image.replace(/^\/?(images\/)?/, '')}`
}

const glassBox = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
  p: 3,
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    color: 'white', borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#a78bfa' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
}

const ProductScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { loading, error, product } = useSelector((state) => state.productDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading: loadingReview, error: errorReview, success: successReview } = useSelector((state) => state.productReviewCreate)

  useEffect(() => {
    if (successReview) {
      setRating(0); setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, successReview])

  const addToCartHandler = () => { dispatch(addToCart(id, qty)); navigate('/cart') }
  const submitReviewHandler = (e) => { e.preventDefault(); dispatch(createProductReview(id, { rating, comment })) }

  return (
    <Box sx={{ py: 4 }}>
      <Button component={Link} to='/' startIcon={<ArrowBackIcon />} sx={{
        mb: 3, borderRadius: '12px', textTransform: 'none',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
        color: 'white', '&:hover': { background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.4)' },
      }}>Go Back</Button>

      {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
        <>
          <Grid container spacing={4}>
            {/* Image */}
            <Grid item xs={12} md={5}>
              <Box sx={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <img
                  src={getImagePath(product.image)} alt={product.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE }}
                  style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            </Grid>

            {/* Details */}
            <Grid item xs={12} md={4}>
              <Box sx={glassBox}>
                <Chip label={product.category} size='small' sx={{
                  mb: 2, background: 'rgba(167,139,250,0.15)',
                  border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa',
                }} />
                <Typography variant='h4' sx={{ fontWeight: 700, color: 'white', mb: 1 }}>{product.name}</Typography>
                <Typography variant='body2' sx={{ color: 'rgba(255,255,255,0.5)', mb: 2 }}>Brand: {product.brand}</Typography>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant='h4' sx={{
                  fontWeight: 700, mb: 2,
                  background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>${product.price}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>{product.description}</Typography>
              </Box>
            </Grid>

            {/* Add to Cart */}
            <Grid item xs={12} md={3}>
              <Box sx={{ ...glassBox, position: 'sticky', top: 80 }}>
                <Typography variant='h6' sx={{ color: 'white', mb: 2, fontWeight: 600 }}>Order Summary</Typography>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Price:</Typography>
                  <Typography sx={{ color: 'white', fontWeight: 600 }}>${product.price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>Status:</Typography>
                  <Chip
                    label={product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    size='small'
                    sx={{
                      background: product.countInStock > 0 ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)',
                      border: `1px solid ${product.countInStock > 0 ? 'rgba(52,211,153,0.4)' : 'rgba(239,68,68,0.4)'}`,
                      color: product.countInStock > 0 ? '#34d399' : '#f87171',
                    }}
                  />
                </Box>

                {product.countInStock > 0 && (
                  <FormControl fullWidth sx={{ mb: 3, ...inputStyle }}>
                    <InputLabel>Qty</InputLabel>
                    <Select value={qty} label='Qty' onChange={(e) => setQty(e.target.value)}
                      sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' } }}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <Button
                  variant='contained' fullWidth size='large'
                  startIcon={<AddShoppingCartIcon />}
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  sx={{
                    borderRadius: '12px', textTransform: 'none', fontWeight: 600, py: 1.5,
                    background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                    '&:hover': { opacity: 0.9, boxShadow: '0 0 30px rgba(167,139,250,0.5)' },
                    '&:disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' },
                  }}
                >
                  {product.countInStock === 0 ? 'Out of Stock' : 'Add To Cart'}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Reviews */}
          <Box sx={{ mt: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 700, color: 'white', mb: 3 }}>Customer Reviews</Typography>
            {product.reviews?.length === 0 && <Message>No Reviews yet. Be the first!</Message>}
            <Grid container spacing={3}>
              {product.reviews?.map((review) => (
                <Grid item xs={12} sm={6} md={4} key={review._id}>
                  <Box sx={glassBox}>
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>{review.name}</Typography>
                    <Rating value={review.rating} />
                    <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.4)' }}>{review.createdAt?.substring(0, 10)}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>{review.comment}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, maxWidth: 500 }}>
              <Typography variant='h6' sx={{ color: 'white', mb: 2, fontWeight: 600 }}>Write a Review</Typography>
              {errorReview && <Message severity='error'>{errorReview}</Message>}
              {userInfo ? (
                <Box component='form' onSubmit={submitReviewHandler} sx={glassBox}>
                  <FormControl fullWidth sx={{ mb: 2, ...inputStyle }}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} label='Rating' onChange={(e) => setRating(e.target.value)}
                      sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' } }}>
                      {[1,2,3,4,5].map((n) => (
                        <MenuItem key={n} value={n}>{n} - {['Poor','Fair','Good','Very Good','Excellent'][n-1]}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField fullWidth multiline rows={3} label='Comment' value={comment}
                    onChange={(e) => setComment(e.target.value)} sx={{ mb: 2, ...inputStyle }} />
                  <Button type='submit' variant='contained' disabled={loadingReview} sx={{
                    borderRadius: '12px', textTransform: 'none', fontWeight: 600,
                    background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                    '&:hover': { opacity: 0.9 },
                  }}>Submit Review</Button>
                </Box>
              ) : (
                <Message>Please <Link to='/login' style={{ color: '#a78bfa' }}>sign in</Link> to write a review</Message>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ProductScreen
