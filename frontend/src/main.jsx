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
  typography: { fontFamily: "'Poppins', sans-serif" },
  palette: {
    mode: 'dark',
    primary: { main: '#a78bfa' },
    secondary: { main: '#60a5fa' },
    background: { default: 'transparent', paper: 'rgba(255,255,255,0.04)' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: 'transparent' } },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: { root: { color: 'white' } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottomColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' },
        head: { color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
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
