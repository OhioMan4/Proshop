import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import store from './store'
import './index.css'

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    mode: 'dark',
    primary: { main: '#a78bfa' },
    secondary: { main: '#60a5fa' },
    background: { default: 'transparent', paper: 'rgba(255,255,255,0.05)' },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: { color: 'white' },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
