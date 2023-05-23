import { FC, useContext, useState } from 'react'

import { ManageContext } from '../../context/ManageProvider'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getCategory, updateCategory } from '../../services/categoryService'

import ICategory from '../../interfaces/category/ICategory'
import IErrorResponse from '../../interfaces/IErrorResponse'
import IUpdateCategoryInitialValues from '../../interfaces/category/IUpdateCategoryInitialValues'

import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import CardModal from '../CardModal'
import EditableValue from '../EditableValue'
import EditableTextField from '../EditableTextField'

import { Box, Button, CircularProgress } from '@mui/material'

const updateCategoryValidation = zod.object({
  name: zod.string()
})

interface State {
  dataInEditing: string[]
}

const CategoryDetailModal: FC = () => {
  const [dataInEditing, setDataInEditing] = useState<State['dataInEditing']>([])

  const { openDetail, handleCloseDetail, selected } = useContext(ManageContext)

  const queryClient = useQueryClient()

  const {
    data: category,
    isLoading,
    isError,
    error
  } = useQuery<ICategory, AxiosError<IErrorResponse>>({
    queryKey: ['category', selected],
    queryFn: () => getCategory(selected),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdate } =
    useMutation<
      ICategory,
      AxiosError<IErrorResponse>,
      { categoryId: number; categoryData: IUpdateCategoryInitialValues }
    >({
      mutationFn: ({ categoryId, categoryData }) =>
        updateCategory(categoryId, categoryData),
      onSuccess: ({ id: categoryId }) => {
        queryClient.invalidateQueries(['categories'])
        queryClient.invalidateQueries(['category', categoryId])
      },
      onError: error => {
        console.log(error)
      },
      onSettled: () => {
        setDataInEditing([])
      }
    })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpdateCategoryInitialValues>({
    resolver: zodResolver(updateCategoryValidation)
  })

  const handleUpdateCategory = (category: ICategory) =>
    handleSubmit(categoryData => {
      if (categoryData.name === category.name) return

      mutateUpdateCategory({ categoryId: category.id, categoryData })
    })

  return (
    <CardModal open={openDetail} onClose={handleCloseDetail}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box>{error.response?.data.message ?? error.message}</Box>
      ) : category ? (
        <Box component='form' onSubmit={handleUpdateCategory(category)}>
          <EditableValue
            name='name'
            defaultValue={category.name}
            variant='h3'
            setValue={setValue}
            dataInEditing={dataInEditing}
            setDataInEditing={setDataInEditing}
          >
            <EditableTextField
              register={register}
              errorMessage={errors.name?.message}
            />
          </EditableValue>

          {dataInEditing.length > 0 && (
            <Button
              variant='contained'
              type='submit'
              disabled={isLoadingUpdate}
              sx={{ mt: 2 }}
              fullWidth
            >
              Actualizar
            </Button>
          )}
        </Box>
      ) : null}
    </CardModal>
  )
}

export default CategoryDetailModal
