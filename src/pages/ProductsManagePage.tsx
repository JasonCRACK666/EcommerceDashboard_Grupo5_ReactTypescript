import { FC, useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import ProductDetailModalProvider, {
  ProductDetailModalContext
} from '../context/ProductDetailModalProvider'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllProducts } from '../services/productService'

import IPaginationResponse from '../interfaces/IPaginationResponse'
import IProduct from '../interfaces/product/IProduct'

import ProductTableRow from '../components/ProductTableRow'
import ProductDetailModal from '../components/ProductDetailModal'

import {
  Container,
  Divider,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  CircularProgress,
  AlertColor,
  Snackbar,
  Alert,
  Button
} from '@mui/material'

interface State {
  showMessage: boolean
  alertMessage: string | null
  typeAlert: AlertColor
}

const ProductsManagePage: FC = () => {
  const [showMessage, setShowMessage] = useState<State['showMessage']>(false)
  const [alertMessage, setAlertMessage] = useState<State['alertMessage']>(null)
  const [typeAlert, setTypeAlert] = useState<State['typeAlert']>('success')

  const navigate = useNavigate()

  const {
    data: products,
    isLoading,
    isError,
    error
  } = useQuery<
    IPaginationResponse<IProduct[]>,
    AxiosError<{ message: string }>
  >(['products'], getAllProducts, {
    refetchOnWindowFocus: false
  })

  const handleCloseMessage = () => {
    setShowMessage(false)
  }

  return (
    <ProductDetailModalProvider>
      <Container maxWidth='lg' sx={{ mt: 2 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography component='h1' variant='h2'>
            Productos
          </Typography>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => navigate('/dashboard/products/create')}
          >
            Añadir producto
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
          ) : isError || !products ? (
            <Box>{error.name}</Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Titulo</TableCell>
                  <TableCell align='right'>Precio original (S/)</TableCell>
                  <TableCell align='right'>Descuento</TableCell>
                  <TableCell align='right'>Stock</TableCell>
                  <TableCell>Fecha publicación</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell align='right'>Imagen (ID)</TableCell>
                  <TableCell align='right'>Colores (Cantidad)</TableCell>
                  <TableCell sx={{ color: 'blue' }}>Detalle</TableCell>
                  <TableCell sx={{ color: 'red' }}>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.data.map(product => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    setAlertMessage={setAlertMessage}
                    setShowMessage={setShowMessage}
                    setTypeAlert={setTypeAlert}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>

      <ShowProductDetailModal />

      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={() => handleCloseMessage()}
      >
        <Alert onClose={() => handleCloseMessage()} severity={typeAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </ProductDetailModalProvider>
  )
}

const ShowProductDetailModal: FC = () => {
  const { isOpen } = useContext(ProductDetailModalContext)

  if (isOpen) return <ProductDetailModal />

  return null
}

export default ProductsManagePage
