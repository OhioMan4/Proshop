import React from 'react'
import { Box, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const icons = { info: <InfoIcon />, error: <ErrorIcon />, success: <CheckCircleIcon />, warning: <InfoIcon /> }
const colors = {
  info: { bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.3)', text: '#60a5fa' },
  error: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
  success: { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.3)', text: '#34d399' },
  warning: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', text: '#fbbf24' },
}

const Message = ({ severity = 'info', children }) => {
  const c = colors[severity]
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: 1.5,
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '12px', p: 2, my: 2, color: c.text,
    }}>
      {icons[severity]}
      <Typography variant='body2'>{children}</Typography>
    </Box>
  )
}

export default Message
