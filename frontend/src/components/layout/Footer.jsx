import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => (
  <Box component='footer' sx={{
    background: 'rgba(15,12,41,0.8)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.6)',
    py: 3, textAlign: 'center', mt: 'auto',
  }}>
    <Typography variant='body2'>© {new Date().getFullYear()} 👟 ProShop — All Rights Reserved.</Typography>
  </Box>
)

export default Footer
