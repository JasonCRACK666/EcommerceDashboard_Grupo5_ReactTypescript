import { FC, useContext } from 'react'

import { ManageContext } from '../../context/ManageProvider'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { deleteColor } from '../../services/colorService'

import IColor from '../../interfaces/color/IColor'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { IconButton, TableCell, TableRow, Typography } from '@mui/material'

import styled from '@emotion/styled'

import { BiDetail } from 'react-icons/bi'
import { BsTrashFill } from 'react-icons/bs'

const ColorCircle = styled.div(props => ({
  backgroundColor: props.color,
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  borderColor: 'black',
  borderWidth: 1,
  borderStyle: 'solid',
  display: 'inline-block'
}))

const ColorTableRow: FC<IColor> = ({ id, name, hex }) => {
  const queryClient = useQueryClient()

  const { setAlertMessage, setTypeAlert, setShowMessage, handleOpenDetail } =
    useContext(ManageContext)

  const { mutate: mutateDeleteColor } = useMutation<
    IMessageResponse,
    AxiosError<IErrorResponse>,
    number
  >({
    mutationFn: deleteColor,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['colors'])
      setAlertMessage(message)
      setTypeAlert('success')
      setShowMessage(true)
    },
    onError: error => {
      setAlertMessage(error.response?.data.message ?? error.message)
      setTypeAlert('error')
      setShowMessage(true)
    }
  })

  const handleDeleteColor = () => {
    mutateDeleteColor(id)
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <ColorCircle color={hex} />
        <Typography
          component='span'
          variant='caption'
          textTransform='uppercase'
        >
          {hex}
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton color='info' onClick={() => handleOpenDetail(id)}>
          <BiDetail />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton color='error' onClick={() => handleDeleteColor()}>
          <BsTrashFill />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ColorTableRow
