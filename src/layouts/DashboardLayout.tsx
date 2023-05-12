import { FC, useContext } from 'react'

import { ResizeListNavContext } from '../context/ResizeListNavProvider'

import { Outlet } from 'react-router-dom'

import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'

import Navbar from '../components/Navbar'
import ListNav from '../components/ListNav'
import ListNavDrawer from '../components/ListNav/Drawer'

const DashboardLayout: FC = () => {
  const { isOpen } = useContext(ResizeListNavContext)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <Grid container>
        {isMobile ? (
          <ListNavDrawer />
        ) : (
          <Grid item md={isOpen ? 2 : 0.6}>
            <ListNav />
          </Grid>
        )}
        <Grid item xs={12} md={isOpen ? 10 : 11.4}>
          <Navbar />
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardLayout
