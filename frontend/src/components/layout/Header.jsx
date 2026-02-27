import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Badge, Menu, MenuItem, Box, InputBase,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SearchIcon from '@mui/icons-material/Search'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [adminAnchorEl, setAdminAnchorEl] = useState(null)
  const [keyword, setKeyword] = useState('')

  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((state) => state.cart)

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
    setAnchorEl(null)
  }

  const searchHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) navigate(`/?keyword=${keyword}`)
    else navigate('/')
  }

  const menuStyle = {
    '& .MuiPaper-root': {
      background: 'rgba(20, 20, 40, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff',
    }
  }

  return (
    <AppBar position='sticky' sx={{
      background: 'rgba(15, 12, 41, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
    }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant='h5' component={Link} to='/' sx={{
          textDecoration: 'none', color: 'white', fontWeight: 700,
          background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          mr: 2, whiteSpace: 'nowrap',
        }}>
          👟 ProShop
        </Typography>

        <Box component='form' onSubmit={searchHandler} sx={{
          flexGrow: 1, display: 'flex', alignItems: 'center',
          background: 'rgba(255,255,255,0.08)', borderRadius: '50px',
          px: 2, py: 0.5, border: '1px solid rgba(255,255,255,0.15)',
          '&:hover': { border: '1px solid rgba(255,255,255,0.3)' },
          maxWidth: 400,
        }}>
          <InputBase placeholder='Search products...' value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ color: 'white', flex: 1, fontSize: '0.9rem',
              '& ::placeholder': { color: 'rgba(255,255,255,0.5)' } }}
          />
          <IconButton type='submit' sx={{ color: 'rgba(255,255,255,0.7)', p: 0.5 }}>
            <SearchIcon fontSize='small' />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <IconButton component={Link} to='/cart' sx={{
            color: 'white', background: 'rgba(255,255,255,0.08)',
            borderRadius: '12px', px: 1.5,
            '&:hover': { background: 'rgba(167,139,250,0.2)' },
          }}>
            <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {userInfo ? (
            <>
              <Button onClick={(e) => setAnchorEl(e.currentTarget)} startIcon={<PersonIcon />} sx={{
                color: 'white', background: 'rgba(255,255,255,0.08)',
                borderRadius: '12px', textTransform: 'none',
                '&:hover': { background: 'rgba(167,139,250,0.2)' },
              }}>
                {userInfo.name}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} sx={menuStyle}>
                <MenuItem component={Link} to='/profile' onClick={() => setAnchorEl(null)}
                  sx={{ '&:hover': { background: 'rgba(167,139,250,0.2)' } }}>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}
                  sx={{ '&:hover': { background: 'rgba(239,68,68,0.2)', color: '#f87171' } }}>Logout</MenuItem>
              </Menu>
              {userInfo.isAdmin && (
                <>
                  <Button onClick={(e) => setAdminAnchorEl(e.currentTarget)} startIcon={<AdminPanelSettingsIcon />} sx={{
                    color: 'white', background: 'rgba(255,255,255,0.08)',
                    borderRadius: '12px', textTransform: 'none',
                    '&:hover': { background: 'rgba(96,165,250,0.2)' },
                  }}>Admin</Button>
                  <Menu anchorEl={adminAnchorEl} open={Boolean(adminAnchorEl)} onClose={() => setAdminAnchorEl(null)} sx={menuStyle}>
                    {[['Users', '/admin/userlist'], ['Products', '/admin/productlist'], ['Orders', '/admin/orderlist']].map(([label, path]) => (
                      <MenuItem key={label} component={Link} to={path} onClick={() => setAdminAnchorEl(null)}
                        sx={{ '&:hover': { background: 'rgba(96,165,250,0.2)' } }}>{label}</MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </>
          ) : (
            <Button component={Link} to='/login' startIcon={<PersonIcon />} sx={{
              color: 'white', background: 'rgba(255,255,255,0.08)',
              borderRadius: '12px', textTransform: 'none',
              '&:hover': { background: 'rgba(167,139,250,0.2)' },
            }}>Sign In</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
