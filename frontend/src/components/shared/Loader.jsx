import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Loader = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 6, gap: 2 }}>
    <CircularProgress size={60} sx={{ color: '#a78bfa' }} />
    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Loading...</Typography>
  </Box>
)

export default Loader
