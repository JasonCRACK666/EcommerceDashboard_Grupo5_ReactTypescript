import { FC, useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import ManageProvider, { ManageContext } from '../context/ManageProvider'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllCategories } from '../services/categoryService'

import ICategory from '../interfaces/category/ICategory'
import IErrorResponse from '../interfaces/IErrorResponse'

import CategoryTableRow from '../components/CategoryTableRow'
import CategoryDetailModal from '../components/CategoryDetailModal'

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

const CategoriesManagePage: FC = () => {
  const navigate = useNavigate()

  const {
    data: categories,
    isLoading,
    isError,
    error
  } = useQuery<ICategory[], AxiosError<IErrorResponse>>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <ManageProvider>
      <Container maxWidth='sm' sx={{ mt: 2 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography component='h1' variant='h2'>
            Categorías
          </Typography>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => navigate('/dashboard/categories/create')}
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
            <Box>{error.response?.data.message ?? error.name}</Box>
          ) : categories ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell sx={{ color: 'blue' }}>Detalle</TableCell>
                  <TableCell sx={{ color: 'red' }}>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map(category => (
                  <CategoryTableRow key={category.id} {...category} />
                ))}
              </TableBody>
            </Table>
          ) : null}
        </TableContainer>
      </Container>

      <ShowCategoryDetailModal />
    </ManageProvider>
  )
}

const ShowCategoryDetailModal: FC = () => {
  const { openDetail } = useContext(ManageContext)

  if (openDetail) return <CategoryDetailModal />

  return null
}

export default CategoriesManagePage
