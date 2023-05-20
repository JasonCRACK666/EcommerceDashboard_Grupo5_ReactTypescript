import { FC, useContext } from 'react'

import { ManageContext } from '../../context/ManageProvider'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { deleteBrand } from '../../services/brandService'

import IBrand from '../../interfaces/brand/IBrand'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { Avatar, IconButton, TableCell, TableRow } from '@mui/material'

import { BiDetail } from 'react-icons/bi'
import { BsTrashFill } from 'react-icons/bs'

const BrandTableRow: FC<IBrand> = ({ id, logo, name }) => {
  const queryClient = useQueryClient()

  const { setAlertMessage, setTypeAlert, setShowMessage, handleOpenDetail } =
    useContext(ManageContext)

  const { mutate: mutateDeleteBrand } = useMutation<
    IMessageResponse,
    AxiosError<IErrorResponse>,
    number
  >({
    mutationFn: deleteBrand,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['brands'])
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

  const handleDeleteBrand = () => {
    mutateDeleteBrand(id)
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Avatar src={logo} alt='logo' />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <IconButton color='info' onClick={() => handleOpenDetail(id)}>
          <BiDetail />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton color='error' onClick={() => handleDeleteBrand()}>
          <BsTrashFill />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default BrandTableRow
