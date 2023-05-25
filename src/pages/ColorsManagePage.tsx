import { FC, useContext } from 'react'

import ManageProvider, { ManageContext } from '../context/ManageProvider'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllColors } from '../services/colorService'

import IColor from '../interfaces/color/IColor'
import IErrorResponse from '../interfaces/IErrorResponse'

import ColorTableRow from '../components/ColorTableRow'
import ColorDetailModal from '../components/ColorDetailModal'

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const ColorsManagePage: FC = () => {
  const {
    data: colors,
    isLoading,
    isError,
    error
  } = useQuery<IColor[], AxiosError<IErrorResponse>>({
    queryKey: ['colors'],
    queryFn: getAllColors,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <ManageProvider>
      <Container maxWidth='sm' sx={{ mt: 2 }}>
        <Typography component='h1' variant='h2'>
          Colores
        </Typography>

        <Divider />

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          {isLoading ? (
            <Box
              sx={{
                py: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Box>{error.response?.data.message ?? error.name}</Box>
          ) : colors ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell sx={{ color: 'blue' }}>Detalle</TableCell>
                  <TableCell sx={{ color: 'red' }}>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {colors.map(color => (
                  <ColorTableRow key={color.id} {...color} />
                ))}
              </TableBody>
            </Table>
          ) : null}
        </TableContainer>
      </Container>

      <ShowColorDetailModal />
    </ManageProvider>
  )
}

const ShowColorDetailModal: FC = () => {
  const { openDetail } = useContext(ManageContext)

  if (!openDetail) return null

  return <ColorDetailModal />
}

export default ColorsManagePage
