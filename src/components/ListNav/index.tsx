import { FC, useContext } from 'react'

import { ResizeListNavContext } from '../../context/ResizeListNavProvider'

import IListItemNav from '../../interfaces/IListItemNav'

import Logo from '../Logo'
import ListItemNav from '../ListItemNav'

import { Box, List, useTheme } from '@mui/material'

import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { FaBuilding, FaRegBuilding } from 'react-icons/fa'
import { RiProductHuntFill, RiProductHuntLine } from 'react-icons/ri'
import { MdCategory, MdOutlineCategory } from 'react-icons/md'
import { IoColorPaletteOutline, IoColorPalette } from 'react-icons/io5'
import { HiUsers, HiOutlineUsers } from 'react-icons/hi'

const links: IListItemNav[] = [
  {
    title: 'Home',
    icon: <AiOutlineHome />,
    activeIcon: <AiFillHome />,
    href: '/dashboard'
  },
  {
    title: 'Usuarios',
    icon: <HiOutlineUsers />,
    activeIcon: <HiUsers />,
    href: '/users'
  },
  {
    title: 'Productos',
    icon: <RiProductHuntLine />,
    activeIcon: <RiProductHuntFill />,
    href: '/products'
  },
  {
    title: 'Marcas',
    icon: <FaRegBuilding />,
    activeIcon: <FaBuilding />,
    href: '/brands'
  },
  {
    title: 'Categorías',
    icon: <MdOutlineCategory />,
    activeIcon: <MdCategory />,
    href: '/categories'
  },
  {
    title: 'Colores',
    icon: <IoColorPaletteOutline />,
    activeIcon: <IoColorPalette />,
    href: '/colors'
  }
]

const ListNav: FC = () => {
  const { isOpen } = useContext(ResizeListNavContext)

  const theme = useTheme()

  return (
    <Box sx={{ height: '100vh', backgroundColor: theme.palette.grey[900] }}>
      <Box
        sx={{
          py: 2,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <Logo size='h5' hideName={!isOpen} />
      </Box>
      <List>
        {links.map(link => (
          <ListItemNav key={link.title} {...link} />
        ))}
      </List>
    </Box>
  )
}

export default ListNav
