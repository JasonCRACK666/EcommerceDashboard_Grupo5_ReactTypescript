import { FC, useContext } from 'react'

import ManageProvider, { ManageContext } from '../context/ManageProvider'

import { useNavigate } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllBrands } from '../services/brandService'

import IBrand from '../interfaces/brand/IBrand'
import IErrorResponse from '../interfaces/IErrorResponse'

import BrandTableRow from '../components/BrandTableRow'
import BrandDetailModal from '../components/BrandDetailModal'

import {
  Box,
  Button,
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

const BrandsManagePage: FC = () => {
  const navigate = useNavigate()

  const {
    data: brands,
    isLoading,
    isError,
    error
  } = useQuery<IBrand[], AxiosError<IErrorResponse>>({
    queryKey: ['brands'],
    queryFn: getAllBrands,
    refetchOnWindowFocus: false
  })

  return (
    <ManageProvider>
      <Container maxWidth='sm' sx={{ mt: 2 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography component='h1' variant='h2'>
            Marcas
          </Typography>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => navigate('/dashboard/brands/create')}
          >
            Añadir categoría
          </Button>
        </Box>

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
            <Box>{error.response?.data.message}</Box>
          ) : brands ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Logo</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell sx={{ color: 'blue' }}>Detalle</TableCell>
                  <TableCell sx={{ color: 'red' }}>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map(brand => (
                  <BrandTableRow key={brand.id} {...brand} />
                ))}
              </TableBody>
            </Table>
          ) : null}
        </TableContainer>
      </Container>

      <ShowBrandDetailModal />
    </ManageProvider>
  )
}

const ShowBrandDetailModal: FC = () => {
  const { openDetail } = useContext(ManageContext)

  if (openDetail) return <BrandDetailModal />

  return null
}

export default BrandsManagePage
