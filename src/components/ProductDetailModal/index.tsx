import { FC, useContext, useState } from 'react'

import { ProductDetailModalContext } from '../../context/ProductDetailModalProvider'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'

import { getProduct, updateProduct } from '../../services/productService'
import { getAllBrands } from '../../services/brandService'
import { getAllCategories } from '../../services/categoryService'

import IDetailProduct from '../../interfaces/product/IDetailProduct'
import IUpdateProductInitialValues from '../../interfaces/product/IUpdateProductInitialValues'
import IBrand from '../../interfaces/brand/IBrand'
import ICategory from '../../interfaces/category/ICategory'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'

import EditableValue from '../EditableValue'
import EditableTextField from '../EditableTextField'
import EditableSelectValue from '../EditableSelectValue'

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography
} from '@mui/material'

const updateProductValidation = zod.object({
  title: zod
    .string()
    .min(6, { message: 'Mínimo 6 caracteres' })
    .max(30, { message: 'Máximo 30 caracteres' })
    .optional(),
  description: zod
    .string()
    .min(15, { message: 'Mínimo 15 caracteres' })
    .optional(),
  originalPrice: zod
    .number()
    .positive({ message: 'Debe ser mayor a 0' })
    .lte(99999.99, { message: 'Máximo 5 dígitos' })
    .multipleOf(0.01, { message: 'Máximo 2 decimales' })
    .optional(),
  discountRate: zod
    .number()
    .nonnegative({ message: 'No debe ser negativo' })
    .lte(50, { message: 'Máximo 50% de descuento' })
    .int({ message: 'Debe de ser un entero' })
    .optional(),
  pointValue: zod
    .number()
    .positive({ message: 'Debe ser mayor a 0' })
    .optional(),
  quantity: zod.number().positive({ message: 'Debe ser mayor a 0' }).optional(),
  category: zod.number().positive({ message: 'Debe ser mayor a 0' }).optional(),
  brand: zod.number().positive({ message: 'No debe ser negativo' }).optional()
})

interface State {
  dataInEditing: string[]
}

const ProductDetailModal: FC = () => {
  const [dataInEditing, setDataInEditing] = useState<State['dataInEditing']>([])

  const queryClient = useQueryClient()

  const { isOpen, handleClose, productSelected } = useContext(
    ProductDetailModalContext
  )

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct
  } = useQuery<IDetailProduct>({
    queryKey: ['product', productSelected],
    queryFn: () => getProduct(productSelected),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories
  } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const {
    data: brands,
    isLoading: isLoadingBrands,
    isError: isErrorBrands
  } = useQuery<IBrand[]>({
    queryKey: ['brands'],
    queryFn: () => getAllBrands(),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const { mutate: updateProductMutate } = useMutation<
    IDetailProduct,
    AxiosError<IErrorResponse>,
    { productId: number; dataProduct: IUpdateProductInitialValues }
  >({
    mutationFn: ({ productId, dataProduct }) =>
      updateProduct(productId, dataProduct),
    onSuccess: () => {
      setDataInEditing([])
      queryClient.invalidateQueries(['product'])
      queryClient.invalidateQueries(['products'])
    },
    onError: ({ message }) => {
      console.log(message)
    }
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<IUpdateProductInitialValues>({
    resolver: zodResolver(updateProductValidation)
  })

  const handleUpdateProduct = (productId: number) =>
    handleSubmit(data => {
      updateProductMutate({ productId: productId, dataProduct: data })
    })

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Paper sx={{ p: 5, minWidth: '600px' }}>
          {isLoadingProduct ? (
            <CircularProgress />
          ) : isErrorProduct ? (
            <Box>Hubo un error</Box>
          ) : product ? (
            <Box component='form' onSubmit={handleUpdateProduct(product.id)}>
              <Stack spacing={1}>
                <Box>
                  <EditableValue
                    name='title'
                    variant='h4'
                    defaultValue={product.title}
                    dataInEditing={dataInEditing}
                    setDataInEditing={setDataInEditing}
                    setValue={setValue}
                  >
                    <EditableTextField
                      errorMessage={errors.title?.message}
                      register={register}
                    />
                  </EditableValue>
                  <Divider />
                </Box>
                <EditableValue
                  name='description'
                  variant='body1'
                  defaultValue={product.description}
                  dataInEditing={dataInEditing}
                  setDataInEditing={setDataInEditing}
                  setValue={setValue}
                >
                  <EditableTextField
                    errorMessage={errors.description?.message}
                    multiline
                    register={register}
                  />
                </EditableValue>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='subtitle2'>
                      Precio original (S/)
                    </Typography>
                    <EditableValue
                      name='originalPrice'
                      variant='body1'
                      defaultValue={product.originalPrice}
                      dataInEditing={dataInEditing}
                      setDataInEditing={setDataInEditing}
                      setValue={setValue}
                    >
                      <EditableTextField
                        errorMessage={errors.originalPrice?.message}
                        register={register}
                      />
                    </EditableValue>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='subtitle2'>Descuento (%)</Typography>
                    <EditableValue
                      name='discountRate'
                      variant='body1'
                      defaultValue={product.discountRate ?? 0}
                      dataInEditing={dataInEditing}
                      setDataInEditing={setDataInEditing}
                      setValue={setValue}
                    >
                      <EditableTextField
                        errorMessage={errors.discountRate?.message}
                        register={register}
                      />
                    </EditableValue>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='subtitle2'>
                      Puntos de compra
                    </Typography>
                    <EditableValue
                      name='pointValue'
                      variant='body1'
                      defaultValue={product.pointValue}
                      dataInEditing={dataInEditing}
                      setDataInEditing={setDataInEditing}
                      setValue={setValue}
                    >
                      <EditableTextField
                        errorMessage={errors.pointValue?.message}
                        register={register}
                      />
                    </EditableValue>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='subtitle2'>Stock</Typography>
                    <EditableValue
                      name='quantity'
                      variant='body1'
                      defaultValue={product.quantity}
                      dataInEditing={dataInEditing}
                      setDataInEditing={setDataInEditing}
                      setValue={setValue}
                    >
                      <EditableTextField
                        errorMessage={errors.quantity?.message}
                        register={register}
                      />
                    </EditableValue>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='subtitle2'>Categoría</Typography>
                    <EditableValue
                      name='category'
                      variant='body1'
                      defaultValue={product.category.name}
                      dataInEditing={dataInEditing}
                      setDataInEditing={setDataInEditing}
                      setValue={setValue}
                    >
                      <EditableSelectValue
                        isError={isErrorCategories}
                        isLoading={isLoadingCategories}
                        options={categories}
                        register={register}
                        defaultValue={product.category.id}
                      />
                    </EditableValue>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='subtitle2'>Marca</Typography>
                    <EditableValue
                      name='brand'
                      variant='body1'
                      defaultValue={product.brand.name}
                      dataInEditing={dataInEditing}
                      setDataInEditing={setDataInEditing}
                      setValue={setValue}
                    >
                      <EditableSelectValue
                        isError={isErrorBrands}
                        isLoading={isLoadingBrands}
                        options={brands}
                        register={register}
                        defaultValue={product.brand.id}
                      />
                    </EditableValue>
                  </Grid>
                </Grid>

                {dataInEditing.length > 0 && (
                  <Button variant='contained' type='submit'>
                    Actualizar
                  </Button>
                )}
              </Stack>
            </Box>
          ) : null}
        </Paper>
      </Box>
    </Modal>
  )
}

export default ProductDetailModal
