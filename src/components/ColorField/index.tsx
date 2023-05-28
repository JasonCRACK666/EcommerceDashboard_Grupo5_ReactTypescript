import { ChangeEvent, FC, useState } from 'react'

import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Box, IconButton, Typography } from '@mui/material'

import { IoMdColorPalette } from 'react-icons/io'

interface State {
  color: string
}

interface Props {
  width: number | string
  height: number | string
  name: string
  error?: boolean
  errorMessage?: string
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
}

const ColorField: FC<Props> = ({
  width,
  height,
  name,
  error,
  errorMessage,
  register,
  setValue
}) => {
  const [color, setColor] = useState<State['color']>('#000000')

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setColor(value)
    setValue(name, value)
  }

  return (
    <Box>
      <Box position='relative'>
        <Box
          sx={{
            width,
            height,
            backgroundColor: color,
            borderRadius: 3,
            display: 'block',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: error ? 'red' : 'black'
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <IconButton color='info' sx={{ p: 0 }}>
            <label
              htmlFor={name}
              style={{ cursor: 'pointer', display: 'flex', padding: 8 }}
            >
              <IoMdColorPalette />
            </label>
          </IconButton>

          <Typography
            variant='subtitle1'
            color={'white'}
            textTransform='uppercase'
            sx={{
              textShadow:
                '2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
            }}
          >
            {color}
          </Typography>
        </Box>
      </Box>

      {errorMessage && (
        <Typography variant='body1' color='red'>
          {errorMessage}
        </Typography>
      )}

      <input
        id={name}
        type='color'
        {...register(name)}
        style={{ display: 'none' }}
        onChange={handleChangeColor}
      />
    </Box>
  )
}

export default ColorField
