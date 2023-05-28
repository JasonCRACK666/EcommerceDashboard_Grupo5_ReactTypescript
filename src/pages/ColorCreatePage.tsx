import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { createColor } from '../services/colorService'

import ICreateColor from '../interfaces/color/ICreateColor'
import IColor from '../interfaces/color/IColor'
import IErrorResponse from '../interfaces/IErrorResponse'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { createColorValidation } from '../validations/createColorValidation'

import ColorField from '../components/ColorField'

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

const ColorCreatePage: FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { mutate: mutateCreateColor, isLoading: isLoadingCreateColor } =
    useMutation<IColor, AxiosError<IErrorResponse>, ICreateColor>({
      mutationFn: createColor,
      onSuccess: () => {
        navigate('/dashboard/colors')
      },
      onError: error => {
        console.log(error)
      }
    })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ICreateColor>({
    resolver: zodResolver(createColorValidation)
  })

  const handleCreateColor = handleSubmit(colorData => {
    mutateCreateColor(colorData)
  })

  return (
    <Container maxWidth='sm' sx={{ mt: 2 }}>
      <Box display='flex' alignItems='center' gap={2}>
        <IconButton sx={{ fontSize: '2rem' }} onClick={() => navigate(-1)}>
          <AiFillCaretLeft />
        </IconButton>
        <Typography component='h1' variant='h3'>
          Añadir color
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box component='form' onSubmit={handleCreateColor}>
        <Stack spacing={2}>
          <ColorField
            name='hex'
            register={register}
            setValue={setValue}
            width={'100%'}
            height={100}
            error={Boolean(errors.hex)}
            errorMessage={errors.hex?.message}
          />
          <TextField
            {...register('name')}
            fullWidth
            label='Nombre'
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
            disabled={isLoadingCreateColor}
          >
            Añadir
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default ColorCreatePage
