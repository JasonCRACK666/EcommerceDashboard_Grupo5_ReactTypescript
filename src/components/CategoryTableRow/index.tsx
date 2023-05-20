import { FC, useContext } from 'react'

import { ManageContext } from '../../context/ManageProvider'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { deleteCategory } from '../../services/categoryService'

import ICategory from '../../interfaces/category/ICategory'
import IMessageResponse from '../../interfaces/IMessageResponse'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { IconButton, TableCell, TableRow } from '@mui/material'

import { BiDetail } from 'react-icons/bi'
import { BsTrashFill } from 'react-icons/bs'

const CategoryTableRow: FC<ICategory> = ({ id, name }) => {
  const queryClient = useQueryClient()

  const { setAlertMessage, setTypeAlert, setShowMessage, handleOpenDetail } =
    useContext(ManageContext)

  const { mutate: mutateDeleteCategory } = useMutation<
    IMessageResponse,
    AxiosError<IErrorResponse>,
    number
  >({
    mutationFn: deleteCategory,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries(['categories'])
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

  const handleDeleteCategory = () => {
    mutateDeleteCategory(id)
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <IconButton color='info' onClick={() => handleOpenDetail(id)}>
          <BiDetail />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton color='error' onClick={() => handleDeleteCategory()}>
          <BsTrashFill />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default CategoryTableRow
