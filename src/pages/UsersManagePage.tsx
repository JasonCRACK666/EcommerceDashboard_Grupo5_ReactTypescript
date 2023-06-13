import { FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllUsers } from '../services/userService'

import IErrorResponse from '../interfaces/IErrorResponse'
import IUser from '../interfaces/user/IUser'

import {
  Box,
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
import UserTableRow from '../components/UserTableRow'

const UsersManagePage: FC = () => {
  const {
    data: users,
    isLoading,
    isError,
    error
  } = useQuery<IUser[], AxiosError<IErrorResponse>>({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false
  })

  return (
    <Container maxWidth='lg' sx={{ mt: 2 }}>
      <Typography component='h1' variant='h2'>
        Usuarios
      </Typography>
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
          <Box>{error.name}</Box>
        ) : users ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>DNI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <UserTableRow key={user.id} {...user} />
              ))}
            </TableBody>
          </Table>
        ) : null}
      </TableContainer>
    </Container>
  )
}

export default UsersManagePage
