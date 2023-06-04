import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { createBrand } from '../services/brandService'

import ICreateBrand from '../interfaces/brand/ICreateBrand'
import IDetailBrand from '../interfaces/brand/IDetailBrand'
import IErrorResponse from '../interfaces/IErrorResponse'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { createBrandValidation } from '../validations/createBrandValidation'

import ImageField from '../components/ImageField'

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'

import { AiFillCaretLeft } from 'react-icons/ai'

const BrandCreatePage: FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { mutate: mutateCreateBrand, isLoading: isLoadingCreateBrand } =
    useMutation<IDetailBrand, AxiosError<IErrorResponse>, FormData>({
      mutationFn: createBrand,
      onSuccess: () => {
        navigate('/dashboard/brands')
      },
      onError: error => {
        console.log(error)
      }
    })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<ICreateBrand>({
    resolver: zodResolver(createBrandValidation)
  })

  const handleCreateBrand = handleSubmit(brandData => {
    const formDataBrand = new FormData()

    formDataBrand.append('logo', brandData.logo)
    formDataBrand.append('banner', brandData.banner)
    formDataBrand.append('name', brandData.name)

    mutateCreateBrand(formDataBrand)
  })

  return (
    <Container maxWidth='sm' sx={{ mt: 2 }}>
      <Box display='flex' alignItems='center' gap={2}>
        <IconButton sx={{ fontSize: '2rem' }} onClick={() => navigate(-1)}>
          <AiFillCaretLeft />
        </IconButton>
        <Typography component='h1' variant='h3'>
          Añadir marca
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box component='form' onSubmit={handleCreateBrand}>
        <Stack spacing={2}>
          <ImageField
            name='banner'
            width={'100%'}
            height={150}
            borderRadius={5}
            error={Boolean(errors.banner?.message)}
            errorMessage={errors.banner?.message}
            register={register}
            setValue={setValue}
            setError={setError}
          />
          <Stack direction='row' spacing={2} alignItems='center'>
            <ImageField
              name='logo'
              width={90}
              height={90}
              borderRadius={'100%'}
              error={Boolean(errors.logo?.message)}
              errorMessage={errors.logo?.message}
              register={register}
              setValue={setValue}
              setError={setError}
            />
            <TextField
              {...register('name')}
              fullWidth
              label='Nombre'
              variant='outlined'
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
              InputProps={{
                sx: {
                  fontSize: theme.typography.h6.fontSize
                }
              }}
              InputLabelProps={{
                sx: {
                  fontSize: theme.typography.h6.fontSize
                }
              }}
              FormHelperTextProps={{
                sx: {
                  fontSize: theme.typography.body1.fontSize
                }
              }}
            />
          </Stack>

          <Button
            type='submit'
            variant='contained'
            color='secondary'
            disabled={isLoadingCreateBrand}
          >
            Añadir marca
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default BrandCreatePage
