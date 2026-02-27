import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'

const steps = ['Sign In', 'Shipping', 'Payment', 'Place Order']

const CheckoutSteps = ({ activeStep }) => (
  <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
    {steps.map((label) => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
)

export default CheckoutSteps
