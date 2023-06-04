import { ChangeEvent, FC, useState } from 'react'

import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import ImageSelectItem from '../ImageSelectItem'

import { Box, Grid, Typography, useTheme } from '@mui/material'

import { AiOutlinePlus } from 'react-icons/ai'

interface State {
  images: File[]
}

interface Props {
  label: string
  name: string
  errorMessage?: string
  error?: boolean
  value: File[]
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
}

const ImagesSelectField: FC<Props> = ({
  label,
  name,
  error,
  errorMessage,
  value,
  register,
  setValue
}) => {
  const [images, setImages] = useState<State['images']>([])

  const theme = useTheme()

  const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
    const fileImages = e.target.files

    if (!fileImages) return

    const fileImagesList = Array.from(fileImages)

    setValue(name, value.concat(fileImagesList))
    setImages(prevImages => prevImages.concat(fileImagesList))
  }

  const handleRemoveImage = (imageIndex: number) => {
    setValue(
      name,
      images.filter((_, index) => index !== imageIndex)
    )
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== imageIndex)
    )
  }

  return (
    <Box>
      <Typography
        variant='h6'
        color={error ? theme.palette.error.main : 'black'}
      >
        {label} {errorMessage && `(${errorMessage})`}
      </Typography>
      <input
        {...register(name, { value: [] })}
        type='file'
        multiple
        id={name}
        name={name}
        accept='image/png, image/jpeg'
        style={{ display: 'none' }}
        onChange={handleChangeImages}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <label htmlFor={name}>
            <Box
              sx={{
                display: 'flex',
                height: 350,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                border: 'solid blue 2px',
                cursor: 'pointer',
                fontSize: 35,
                color: 'blue'
              }}
            >
              <AiOutlinePlus />
            </Box>
          </label>
        </Grid>

        {images.map((image, index) => (
          <ImageSelectItem
            image={URL.createObjectURL(image)}
            index={index}
            key={index}
            removeImage={handleRemoveImage}
          />
        ))}
      </Grid>
    </Box>
  )
}

export default ImagesSelectField
