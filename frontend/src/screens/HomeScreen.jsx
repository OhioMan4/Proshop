import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, Link } from 'react-router-dom'
import { Grid, Typography, Button, Box, Pagination } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { listProducts } from '../actions/productActions'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  const pageNumber = searchParams.get('page') || 1

  const { loading, error, products = [], page, pages } = useSelector((state) => state.productList)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <Box sx={{ py: 4 }}>
      {keyword && (
        <Button
          component={Link} to='/'
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 3, borderRadius: '12px', textTransform: 'none',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white', backdropFilter: 'blur(10px)',
            '&:hover': { background: 'rgba(167,139,250,0.2)', border: '1px solid rgba(167,139,250,0.4)' },
          }}
        >
          Go Back
        </Button>
      )}

      <Typography variant='h4' sx={{
        fontWeight: 700, mb: 4,
        background: 'linear-gradient(90deg, #ffffff, #a78bfa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {keyword ? `Results for "${keyword}"` : '🔥 Latest Products'}
      </Typography>

      {loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
        <>
          {products.length === 0 ? (
            <Message>No products found.</Message>
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
          {pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Pagination
                count={pages} page={Number(page)} color='primary'
                onChange={(e, value) => setSearchParams({ keyword, page: value })}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white', borderColor: 'rgba(255,255,255,0.2)',
                    '&.Mui-selected': { background: 'rgba(167,139,250,0.3)', borderColor: '#a78bfa' },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default HomeScreen
