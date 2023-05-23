import { FC, useContext, useState } from 'react'

import { ManageContext } from '../../context/ManageProvider'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getBrand, updateBrand } from '../../services/brandService'

import IDetailBrand from '../../interfaces/brand/IDetailBrand'
import IErrorResponse from '../../interfaces/IErrorResponse'
import IUpdateBrandInitialValues from '../../interfaces/brand/IUpdateBrandInitialValues'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'

import CardModal from '../CardModal'
import EditableValue from '../EditableValue'
import EditableTextField from '../EditableTextField'
import EditableImage from '../EditableImage'

import { Box, Button, CircularProgress, Stack } from '@mui/material'

const updateBrandValidation = zod.object({
  name: zod.string().optional(),
  logo: zod.custom<File | null>().default(null).optional(),
  banner: zod.custom<File | null>().default(null).optional()
})

interface State {
  dataInEditing: string[]
}

const BrandDetailModal: FC = () => {
  const [dataInEditing, setDataInEditing] = useState<State['dataInEditing']>([])

  const { openDetail, handleCloseDetail, selected } = useContext(ManageContext)

  const queryClient = useQueryClient()

  const {
    data: brand,
    isLoading,
    isError,
    error
  } = useQuery<IDetailBrand, AxiosError<IErrorResponse>>({
    queryKey: ['brand', selected],
    queryFn: () => getBrand(selected),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const { mutate: mutateUpdateBrand, isLoading: isLoadingUpdate } = useMutation<
    IDetailBrand,
    AxiosError<IErrorResponse>,
    { brandId: number; brandFormData: FormData }
  >({
    mutationFn: ({ brandId, brandFormData }) =>
      updateBrand(brandId, brandFormData),
    onSuccess: () => {
      queryClient.invalidateQueries(['brands'])
      queryClient.invalidateQueries(['brand', selected])
      setDataInEditing([])
    },
    onError: error => {
      console.log(error)
    }
  })

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IUpdateBrandInitialValues>({
    resolver: zodResolver(updateBrandValidation)
  })

  const handleOnSubmit = (brand: IDetailBrand) =>
    handleSubmit(data => {
      const brandFormData = new FormData()

      if (data.banner instanceof File) {
        brandFormData.append('banner', data.banner)
      }

      if (data.logo instanceof File) {
        brandFormData.append('logo', data.logo)
      }

      if (data.name && data.name !== brand.name) {
        brandFormData.append('name', data.name)
      }

      if (
        !brandFormData.get('banner') &&
        !brandFormData.get('logo') &&
        !brandFormData.get('name')
      ) {
        return
      }

      mutateUpdateBrand({ brandId: brand.id, brandFormData })
    })

  return (
    <CardModal open={openDetail} onClose={handleCloseDetail}>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Box>{error.response?.data.message ?? error.message}</Box>
      ) : brand ? (
        <Box component='form' onSubmit={handleOnSubmit(brand)}>
          <Box mb={2}>
            <EditableImage
              src={brand.banner}
              name='banner'
              dataInEditing={dataInEditing}
              setDataInEditing={setDataInEditing}
              setValue={setValue}
              register={register}
              width={'100%'}
              height={'200px'}
              borderRadius={10}
            />
          </Box>
          <Stack direction='row' spacing={3} alignItems='center'>
            <EditableImage
              src={brand.logo}
              name='logo'
              dataInEditing={dataInEditing}
              setDataInEditing={setDataInEditing}
              setValue={setValue}
              register={register}
              width={'100px'}
              height={'100px'}
              borderRadius={'100%'}
            />
            <EditableValue
              name='name'
              variant='h3'
              dataInEditing={dataInEditing}
              setDataInEditing={setDataInEditing}
              defaultValue={brand.name}
              setValue={setValue}
            >
              <EditableTextField
                errorMessage={errors.name?.message}
                register={register}
              />
            </EditableValue>
          </Stack>

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

export default BrandDetailModal
