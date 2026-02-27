import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material'
import Rating from '../shared/Rating'

const FALLBACK_IMAGE = 'https://placehold.co/400x300?text=No+Image'

const getImagePath = (image) => {
  if (!image) return FALLBACK_IMAGE
  if (image.startsWith('http')) return image
  // strips leading slash if already present, then adds /images/ prefix
  const filename = image.replace(/^\/?(images\/)?/, '')
  return `/images/${filename}`
}

const ProductCard = ({ product }) => (
  <Card sx={{
    height: '100%', display: 'flex', flexDirection: 'column',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px', overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 60px rgba(167,139,250,0.3)',
      border: '1px solid rgba(167,139,250,0.4)',
    },
  }}>
    <Box component={Link} to={`/product/${product._id}`} sx={{ display: 'block', overflow: 'hidden', position: 'relative' }}>
      <img
        src={getImagePath(product.image)}
        alt={product.name}
        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE }}
        style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      />
      <Chip label={product.category} size='small' sx={{
        position: 'absolute', top: 10, right: 10,
        background: 'rgba(15,12,41,0.7)', backdropFilter: 'blur(10px)',
        color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)',
        fontSize: '0.7rem',
      }} />
    </Box>

    <CardContent sx={{ flexGrow: 1, p: 2 }}>
      <Typography component={Link} to={`/product/${product._id}`} variant='subtitle1' sx={{
        textDecoration: 'none', color: 'white', fontWeight: 600,
        display: 'block', mb: 1,
        '&:hover': { color: '#a78bfa' },
      }}>
        {product.name}
      </Typography>
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <Typography variant='h6' sx={{
        mt: 1, fontWeight: 700,
        background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        ${product.price}
      </Typography>
    </CardContent>

    <CardActions sx={{ p: 2, pt: 0 }}>
      <Button
        component={Link} to={`/product/${product._id}`}
        variant='outlined' fullWidth
        sx={{
          borderRadius: '10px', textTransform: 'none', fontWeight: 600,
          border: '1px solid rgba(167,139,250,0.5)', color: '#a78bfa',
          background: 'rgba(167,139,250,0.05)',
          '&:hover': {
            background: 'rgba(167,139,250,0.15)',
            border: '1px solid #a78bfa',
            boxShadow: '0 0 20px rgba(167,139,250,0.3)',
          },
        }}
      >
        View Details →
      </Button>
    </CardActions>
  </Card>
)

export default ProductCard
