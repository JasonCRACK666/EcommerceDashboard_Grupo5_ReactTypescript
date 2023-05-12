import { FC, MouseEvent, useContext, useState } from 'react'

import { ResizeListNavContext } from '../../context/ResizeListNavProvider'

import { useAuthStore } from '../../store/useAuthStore'

import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material'

import { AiOutlineMenu } from 'react-icons/ai'
import { ImExit } from 'react-icons/im'
import { FaUserCircle } from 'react-icons/fa'

interface State {
  anchorEl: null | HTMLElement
}

const Navbar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<State['anchorEl']>(null)
  const openMenu = Boolean(anchorEl)

  const { handleToggleResize } = useContext(ResizeListNavContext)

  const user = useAuthStore(state => state.user)
  const { logOut } = useAuthStore()

  const navigate = useNavigate()

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logOut()
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AppBar position='sticky' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color='inherit'
          sx={{ p: 1.2 }}
          onClick={handleToggleResize}
        >
          <AiOutlineMenu />
        </IconButton>
        <IconButton
          id='user-menu-btn'
          aria-controls={openMenu ? 'user-menu-options' : undefined}
          aria-haspopup='true'
          aria-expanded={openMenu ? 'true' : undefined}
          sx={{ p: 0 }}
          onClick={handleOpenMenu}
        >
          <Avatar alt={user?.username} src={user?.avatar} />
        </IconButton>
        <Menu
          id='user-menu-options'
          aria-labelledby='user-menu-btn'
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={openMenu}
        >
          {/* TODO: Me debe de redirigir a la pagina para poder modificar mi cuenta, pero esta se hará en la App de Ecommerce */}
          <MenuItem onClick={() => navigate('/dashboard')}>
            <ListItemIcon sx={{ fontSize: '1.8rem' }}>
              <FaUserCircle />
            </ListItemIcon>
            Cuenta
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ fontSize: '1.8rem' }}>
              <ImExit />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
