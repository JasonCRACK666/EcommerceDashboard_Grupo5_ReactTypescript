import { FC, useContext, useState } from 'react'

import { ManageContext } from '../../context/ManageProvider'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getColor, updateColor } from '../../services/colorService'

import IColor from '../../interfaces/color/IColor'
import IUpdateColor from '../../interfaces/color/IUpdateColor'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import CardModal from '../CardModal'
import EditableValue from '../EditableValue'
import EditableTextField from '../EditableTextField'

import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import EditableColor from '../EditableColor'

const updateColorValidation = zod.object({
  name: zod.string(),
  hex: zod.string().startsWith('#').max(7)
})

interface State {
  dataInEditing: string[]
}

const ColorDetailModal: FC = () => {
  const [dataInEditing, setDataInEditing] = useState<State['dataInEditing']>([])

  const { openDetail, handleCloseDetail, selected } = useContext(ManageContext)

  const queryClient = useQueryClient()

  const {
    data: color,
    isLoading,
    isError,
    error
  } = useQuery<IColor, AxiosError<IErrorResponse>>({
    queryKey: ['color', selected],
    queryFn: () => getColor(selected),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const { mutate: mutateUpdateColor, isLoading: isLoadingUpdate } = useMutation<
    IColor,
    AxiosError<IErrorResponse>,
    { colorId: number; colorData: IUpdateColor }
  >({
    mutationFn: ({ colorId, colorData }) => updateColor(colorId, colorData),
    onSuccess: () => {
      queryClient.invalidateQueries(['colors'])
      queryClient.invalidateQueries(['color', selected])
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
  } = useForm<IUpdateColor>({
    resolver: zodResolver(updateColorValidation)
  })

  const handleUpdateColor = (color: IColor) =>
    handleSubmit(data => {
      if (data.hex === color.hex && data.name === color.name) return

      mutateUpdateColor({ colorId: color.id, colorData: data })
    })

  return (
    <CardModal open={openDetail} onClose={handleCloseDetail}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography variant='h6' color='red'>
          {error.response?.data.message ?? error.message}
        </Typography>
      ) : color ? (
        <Box component='form' onSubmit={handleUpdateColor(color)}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Box display='flex' alignItems='center'>
              <EditableColor
                name='hex'
                width={'150px'}
                height={'100px'}
                borderRadius={'10px'}
                defaultValue={color.hex}
                register={register}
                setValue={setValue}
                dataInEditing={dataInEditing}
                setDataInEditing={setDataInEditing}
              />
            </Box>
            <EditableValue
              name='name'
              defaultValue={color.name}
              variant='h2'
              setValue={setValue}
              dataInEditing={dataInEditing}
              setDataInEditing={setDataInEditing}
            >
              <EditableTextField
                register={register}
                errorMessage={errors.name?.message}
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

export default ColorDetailModal
