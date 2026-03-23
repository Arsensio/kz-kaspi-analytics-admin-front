import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

const navItems = [
  { label: 'Главная', path: '/dashboard' },
  { label: 'Поиск ниши', path: '/niche-search' },
  { label: 'Продуктовые тарифы', path: '/product-tariffs' },
  { label: 'Тарифы', path: '/plans' },
  { label: 'Пользователи', path: '/users' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const toggleDrawer = (state) => () => {
    setOpen(state)
  }

  const handleNavigate = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              aria-label="Открыть меню"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">NamaHub CRM</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          role="presentation"
        >
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            NamaHub CRM
          </Typography>

          <Divider />

          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                selected={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Button fullWidth variant="outlined" onClick={logout}>
              Выйти
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
