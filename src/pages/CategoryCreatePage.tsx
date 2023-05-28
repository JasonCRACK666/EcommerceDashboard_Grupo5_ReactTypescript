import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { createCategory } from '../services/categoryService'

import ICategory from '../interfaces/category/ICategory'
import ICreateCategory from '../interfaces/category/ICreateCategory'
import IErrorResponse from '../interfaces/IErrorResponse'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { createCategoryValidation } from '../validations/createCategoryValidation'

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme
} from '@mui/material'

import { AiFillCaretLeft } from 'react-icons/ai'

const CategoryCreatePage: FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation<ICategory, AxiosError<IErrorResponse>, ICreateCategory>({
      mutationFn: createCategory,
      onSuccess: () => {
        navigate(-1)
      },
      onError: error => {
        console.log(error)
      }
    })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICreateCategory>({
    resolver: zodResolver(createCategoryValidation)
  })

  const handleCreateCategory = handleSubmit(data => {
    mutateCreateCategory(data)
  })

  return (
    <Container maxWidth='md' sx={{ my: 2 }}>
      <Box display='flex' alignItems='center' gap={2}>
        <IconButton sx={{ fontSize: '2rem' }} onClick={() => navigate(-1)}>
          <AiFillCaretLeft />
        </IconButton>
        <Typography component='h1' variant='h3'>
          Añadir categoría
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box component='form' onSubmit={handleCreateCategory}>
        <TextField
          {...register('name')}
          fullWidth
          sx={{ mb: 2 }}
          label='Nombre'
          variant='filled'
          error={Boolean(errors.name)}
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

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          disabled={isLoadingCreateCategory}
        >
          Añadir categoría
        </Button>
      </Box>
    </Container>
  )
}

export default CategoryCreatePage
