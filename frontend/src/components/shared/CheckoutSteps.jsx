import React from 'react'
import { Stepper, Step, StepLabel, Box } from '@mui/material'

const steps = ['Sign In', 'Shipping', 'Payment', 'Place Order']

const CheckoutSteps = ({ activeStep }) => (
  <Box sx={{ mb: 4 }}>
    <Stepper activeStep={activeStep} alternativeLabel sx={{
      '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.4)', fontFamily: 'Poppins, sans-serif' },
      '& .MuiStepLabel-label.Mui-active': { color: 'white', fontWeight: 600 },
      '& .MuiStepLabel-label.Mui-completed': { color: '#a78bfa' },
      '& .MuiStepIcon-root': { color: 'rgba(255,255,255,0.15)' },
      '& .MuiStepIcon-root.Mui-active': { color: '#a78bfa' },
      '& .MuiStepIcon-root.Mui-completed': { color: '#60a5fa' },
      '& .MuiStepConnector-line': { borderColor: 'rgba(255,255,255,0.1)' },
    }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
)

export default CheckoutSteps
