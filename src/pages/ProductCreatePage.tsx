import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { createProduct } from '../services/productService'

import ICreateProduct from '../interfaces/product/ICreateProduct'
import IDetailProduct from '../interfaces/product/IDetailProduct'
import IErrorResponse from '../interfaces/IErrorResponse'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { createProductValidation } from '../validations/createProductValidation'

import ImagesSelectField from '../components/ImagesSelectField'
import ColorsMultipleSelectField from '../components/ColorsMultipleSelectField'
import CategorySelectField from '../components/CategorySelectField'
import BrandSelectField from '../components/BrandSelectField'

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'

import { AiFillCaretLeft } from 'react-icons/ai'

const ProductCreatePage: FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { mutate: mutateCreateProduct, isLoading: isLoadingCreateProduct } =
    useMutation<IDetailProduct, AxiosError<IErrorResponse>, FormData>({
      mutationFn: createProduct,
      onSuccess: () => {
        navigate('/dashboard/products')
      },
      onError: error => {
        console.log(error)
      }
    })

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<ICreateProduct>({
    resolver: zodResolver(createProductValidation)
  })

  const handleCreateProduct = handleSubmit(dataProduct => {
    const formDataProduct = new FormData()

    formDataProduct.append('title', dataProduct.title)
    formDataProduct.append('description', dataProduct.description)
    formDataProduct.append(
      'originalPrice',
      dataProduct.originalPrice.toString()
    )

    if (
      dataProduct.discountRate &&
      !isNaN(dataProduct.discountRate as number)
    ) {
      formDataProduct.append(
        'discountRate',
        dataProduct.discountRate.toString()
      )
    }

    formDataProduct.append('pointValue', dataProduct.pointValue.toString())
    formDataProduct.append('quantity', dataProduct.quantity.toString())
    formDataProduct.append('category', dataProduct.category.toString())
    formDataProduct.append('brand', dataProduct.brand.toString())

    dataProduct.images.forEach(image => {
      formDataProduct.append('images', image)
    })

    dataProduct.colors.forEach(color => {
      formDataProduct.append('colors', color.toString())
    })

    mutateCreateProduct(formDataProduct)
  })

  return (
    <Container maxWidth='md' sx={{ my: 2 }}>
      <Box display='flex' alignItems='center' gap={2}>
        <IconButton sx={{ fontSize: '2rem' }} onClick={() => navigate(-1)}>
          <AiFillCaretLeft />
        </IconButton>
        <Typography component='h1' variant='h3'>
          Añadir producto
        </Typography>
      </Box>

      <Divider />

      <Box component='form' onSubmit={handleCreateProduct} mt={2}>
        <Stack spacing={2}>
          <TextField
            {...register('title')}
            fullWidth
            variant='standard'
            label='Título'
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            InputProps={{
              sx: {
                fontSize: theme.typography.h5.fontSize
              }
            }}
            InputLabelProps={{
              sx: {
                fontSize: theme.typography.h5.fontSize
              }
            }}
            FormHelperTextProps={{
              sx: {
                fontSize: theme.typography.body1.fontSize
              }
            }}
          />
          <TextField
            {...register('description')}
            fullWidth
            multiline
            rows={4}
            variant='outlined'
            label='Descripción'
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            InputProps={{
              sx: {
                fontSize: theme.typography.body1.fontSize
              }
            }}
            InputLabelProps={{
              sx: {
                fontSize: theme.typography.body1.fontSize
              }
            }}
            FormHelperTextProps={{
              sx: {
                fontSize: theme.typography.body2.fontSize
              }
            }}
          />
          <ImagesSelectField
            label='Imágenes'
            name='images'
            setValue={setValue}
            value={getValues().images}
            error={Boolean(errors.images)}
            errorMessage={errors.images?.message}
            register={register}
          />
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ColorsMultipleSelectField
                register={register}
                setValue={setValue}
                error={Boolean(errors.colors)}
                errorMessage={errors.colors?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <CategorySelectField
                register={register}
                error={Boolean(errors.category)}
                errorMessage={errors.category?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <BrandSelectField
                register={register}
                error={Boolean(errors.brand)}
                errorMessage={errors.brand?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('originalPrice', { valueAsNumber: true })}
                fullWidth
                type='number'
                variant='standard'
                label='Precio original'
                error={Boolean(errors.originalPrice)}
                helperText={errors.originalPrice?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('discountRate', { valueAsNumber: true })}
                fullWidth
                type='number'
                variant='standard'
                label='Porcentaje de descuento (%)'
                error={Boolean(errors.discountRate)}
                helperText={errors.discountRate?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('pointValue', { valueAsNumber: true })}
                fullWidth
                type='number'
                variant='standard'
                label='Puntos de compra'
                error={Boolean(errors.pointValue)}
                helperText={errors.pointValue?.message}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...register('quantity', { valueAsNumber: true })}
                fullWidth
                type='number'
                variant='standard'
                label='Stock'
                error={Boolean(errors.quantity)}
                helperText={errors.quantity?.message}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            disabled={isLoadingCreateProduct}
          >
            Añadir
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default ProductCreatePage
