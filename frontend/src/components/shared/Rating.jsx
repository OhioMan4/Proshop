import React from 'react'
import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const Rating = ({ value, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Box key={star} sx={{ color: '#fbbf24', display: 'flex' }}>
        {value >= star ? <StarIcon sx={{ fontSize: '1rem' }} /> : value >= star - 0.5 ? <StarHalfIcon sx={{ fontSize: '1rem' }} /> : <StarBorderIcon sx={{ fontSize: '1rem' }} />}
      </Box>
    ))}
    {text && <Typography variant='caption' sx={{ ml: 0.5, color: 'rgba(255,255,255,0.5)' }}>{text}</Typography>}
  </Box>
)

export default Rating
