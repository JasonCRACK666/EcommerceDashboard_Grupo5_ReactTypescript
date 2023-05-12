import { FC, useContext } from 'react'

import { ResizeListNavContext } from '../../context/ResizeListNavProvider'

import { Link, useLocation } from 'react-router-dom'

import IListItemNav from '../../interfaces/IListItemNav'

import {
  useTheme,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'

const ListItemNav: FC<IListItemNav> = ({ title, icon, activeIcon, href }) => {
  const { isOpen } = useContext(ResizeListNavContext)
  const { pathname } = useLocation()

  const theme = useTheme()

  const isActive = href === pathname

  return (
    <ListItem disablePadding component={Link} to={href} sx={{ color: 'white' }}>
      <ListItemButton
        sx={{
          '&.Mui-selected': { backgroundColor: theme.palette.grey[800] },
          '&.MuiListItemButton-root': {
            ':hover': {
              backgroundColor: theme.palette.grey[800]
            }
          },
          display: 'flex',
          justifyContent: isOpen ? 'start' : 'center',
          flexDirection: isOpen ? 'row' : 'column',
          alignItems: 'center'
        }}
        selected={isActive}
      >
        <ListItemIcon
          sx={{
            color: 'white',
            fontSize: '1.4rem',
            py: isOpen ? 0.5 : 0,
            justifyContent: 'center'
          }}
        >
          {isActive ? activeIcon : icon}
        </ListItemIcon>

        {isOpen ? (
          <ListItemText primary={title} />
        ) : (
          <Typography variant='caption'>{title}</Typography>
        )}
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemNav
