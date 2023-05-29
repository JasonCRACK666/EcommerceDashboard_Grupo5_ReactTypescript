import { ChangeEvent, FC, useState } from 'react'

import {
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'

import { Box, IconButton, Typography } from '@mui/material'

import { BsImage } from 'react-icons/bs'

interface State {
  image: string | null
}

interface Props {
  name: string
  width: string | number
  height: string | number
  borderRadius: string | number
  error?: boolean
  errorMessage?: string
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  setError: UseFormSetError<any>
}

const ImageField: FC<Props> = ({
  name,
  width,
  height,
  borderRadius,
  error,
  errorMessage,
  register,
  setValue,
  setError
}) => {
  const [image, setImage] = useState<State['image']>(null)

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.item(0)

    if (!image) {
      setError(name, { message: errorMessage })
      return
    }

    setImage(URL.createObjectURL(image))
    setValue(name, image)
    setError(name, { message: undefined })
  }

  return (
    <Box width={width}>
      <Box position='relative'>
        {image ? (
          <img
            src={image}
            alt={name}
            width={width}
            height={height}
            style={{
              objectFit: 'cover',
              borderRadius,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: error ? 'red' : 'black'
            }}
          />
        ) : (
          <Box
            sx={{
              width,
              height,
              borderRadius,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: error ? 'red' : 'black'
            }}
          />
        )}

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <IconButton color='info' sx={{ p: 0 }}>
            <label style={{ cursor: 'pointer', display: 'flex', padding: 8 }}>
              <BsImage />
              <input
                {...register(name)}
                type='file'
                accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                onChange={handleChangeImage}
              />
            </label>
          </IconButton>
        </Box>
      </Box>

      <Typography variant='body2' color='red' align='center' mt={0.5}>
        {errorMessage}
      </Typography>
    </Box>
  )
}

export default ImageField
