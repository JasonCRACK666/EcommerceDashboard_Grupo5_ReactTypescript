import { FC } from 'react'

import IUser from '../../interfaces/user/IUser'

import { Avatar, TableCell, TableRow, Typography } from '@mui/material'

const UserTableRow: FC<IUser> = ({
  id,
  avatar,
  userName,
  firstName,
  lastName,
  email,
  DNI
}) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={avatar} alt={userName} />
        <Typography>{userName}</Typography>
      </TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{DNI}</TableCell>
    </TableRow>
  )
}

export default UserTableRow
