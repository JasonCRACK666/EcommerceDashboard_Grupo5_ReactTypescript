import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Box, IconButton, Stack } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import { IoMdColorPalette } from 'react-icons/io'

interface State {
  color: string
}

interface Props {
  defaultValue: string
  width: number | string
  height: number | string
  borderRadius: number | string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  dataInEditing: string[]
  setDataInEditing: Dispatch<SetStateAction<string[]>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
}

const EditableColor: FC<Props> = ({
  width,
  height,
  name,
  register,
  dataInEditing,
  setDataInEditing,
  setValue,
  defaultValue,
  borderRadius
}) => {
  const [color, setColor] = useState<State['color']>(defaultValue)

  const inEditing = dataInEditing.includes(name)

  const handleCancelChanged = () => {
    setValue(name, null)
    setColor(defaultValue)
    setDataInEditing(namesInEditing =>
      namesInEditing.filter(nameInEditing => nameInEditing !== name)
    )
  }

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
    setValue(name, newColor)

    if (!inEditing) {
      setDataInEditing(namesInEditing => [...namesInEditing, name])
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        display: 'block',
        backgroundColor: color,
        borderRadius,
        border: `solid ${inEditing ? 'blue 3px' : 'black 1px'}`
      }}
    >
      <input
        type='color'
        id={name}
        style={{ display: 'none' }}
        {...register(name)}
        onChange={handleChangeColor}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Stack direction='row' spacing={1}>
          {inEditing && (
            <IconButton color='error' onClick={() => handleCancelChanged()}>
              <AiOutlineClose />
            </IconButton>
          )}

          <IconButton color='info'>
            <label htmlFor={name} style={{ cursor: 'pointer' }}>
              <IoMdColorPalette />
            </label>
          </IconButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default EditableColor
