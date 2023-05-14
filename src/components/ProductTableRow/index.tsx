import { FC } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { deleteProduct } from '../../services/productService'

import IProduct from '../../interfaces/product/IProduct'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { AlertColor, IconButton, TableCell, TableRow } from '@mui/material'

import { BsTrashFill } from 'react-icons/bs'

interface Props {
  product: IProduct
  setAlertMessage: (message: string | null) => void
  setShowMessage: (value: boolean) => void
  setTypeAlert: (value: AlertColor) => void
}

const ProductTableRow: FC<Props> = ({
  product,
  setAlertMessage,
  setShowMessage,
  setTypeAlert
}) => {
  const queryClient = useQueryClient()

  const { mutate: mutateDeleteProduct } = useMutation<
    IMessageResponse,
    AxiosError<IErrorResponse>,
    number
  >({
    mutationFn: deleteProduct,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['products'])
      setAlertMessage(message)
      setTypeAlert('success')
      setShowMessage(true)
    },
    onError: error => {
      setAlertMessage(error.response?.data.message ?? null)
      setTypeAlert('error')
      setShowMessage(true)
    }
  })

  const handleDeleteProduct = (productId: number) => {
    mutateDeleteProduct(productId)
  }

  return (
    <TableRow>
      <TableCell align='center'>{product.id}</TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell align='right'>{product.originalPrice}</TableCell>
      {product.discountRate ? (
        <TableCell align='right'>{product.discountRate}%</TableCell>
      ) : (
        <TableCell>No tiene</TableCell>
      )}
      <TableCell align='right'>{product.quantity}</TableCell>
      <TableCell>
        {new Date(product.publicationDate).toLocaleDateString()}
      </TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.brand.name}</TableCell>
      <TableCell align='right'>{product.image.id}</TableCell>
      <TableCell align='right'>{product.colors.length}</TableCell>
      <TableCell>
        <IconButton
          color='error'
          onClick={() => handleDeleteProduct(product.id)}
        >
          <BsTrashFill />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ProductTableRow
