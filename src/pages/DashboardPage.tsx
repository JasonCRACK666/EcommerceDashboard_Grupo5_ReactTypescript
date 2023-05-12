import { FC } from 'react'

import { Box, Typography } from '@mui/material'

const DashboardPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '91vh'
      }}
    >
      <Typography component='h1' variant='h2'>
        Estadísticas
      </Typography>
    </Box>
  )
}

export default DashboardPage
