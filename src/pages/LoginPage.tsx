import { FC, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/useAuthStore'

import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { login } from '../services/authService'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import IErrorResponse from '../interfaces/IErrorResponse'
import ILoginSendData from '../interfaces/auth/ILoginSendData'
import ILoginResponse from '../interfaces/auth/ILoginResponse'

import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography
} from '@mui/material'

import { BsCart4 } from 'react-icons/bs'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const loginValidation = zod.object({
  password: zod.string().nonempty({ message: 'La contraseña es requerida' }),
  email: zod
    .string()
    .email({ message: 'El correo electrónico es invalido' })
    .nonempty({ message: 'El correo electrónico es requerido' })
})

interface State {
  errorMessage: string | null
  showError: boolean
  showPassword: boolean
}

const LoginPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState<State['errorMessage']>(null)
  const [showError, setShowError] = useState<State['showError']>(false)
  const [showPassword, setShowPassword] = useState<State['showPassword']>(false)

  const { setToken } = useAuthStore()

  const navigate = useNavigate()

  const { mutate: mutateLogin } = useMutation<
    ILoginResponse,
    AxiosError<IErrorResponse>,
    ILoginSendData
  >({
    mutationFn: login,
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token)
      setToken(token)
      navigate('/dashboard')
    },
    onError: ({ message }) => {
      setErrorMessage(message)
      setShowError(true)
    }
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ILoginSendData>({
    resolver: zodResolver(loginValidation)
  })

  const onSubmit = (data: ILoginSendData) => {
    mutateLogin(data)
  }

  const handleShowPassword = () => setShowPassword(prev => !prev)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 400, mb: showError ? 2 : 0 }}>
        <Typography variant='h3' textAlign='center' mb={2}>
          <BsCart4 /> Tech House
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label='Correo electrónico'
            variant='outlined'
            helperText={errors.email?.message}
            error={Boolean(errors.email?.message)}
            FormHelperTextProps={{ style: { color: 'red' } }}
            sx={{ mb: 2 }}
            {...register('email')}
          />
          <FormControl fullWidth sx={{ mb: 2 }} variant='outlined'>
            <InputLabel
              htmlFor='password'
              error={Boolean(errors.password?.message)}
            >
              Contraseña
            </InputLabel>
            <OutlinedInput
              id='password'
              error={Boolean(errors.password?.message)}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleShowPassword}
                    color={errors.password?.message ? 'error' : 'default'}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </IconButton>
                </InputAdornment>
              }
              label='Contraseña'
            />
            {errors.password?.message && (
              <FormHelperText style={{ color: 'red' }}>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button type='submit' variant='contained' fullWidth>
            Ingresar
          </Button>
        </form>
      </Paper>

      {showError && <Alert severity='error'>{errorMessage}</Alert>}
    </Box>
  )
}

export default LoginPage
