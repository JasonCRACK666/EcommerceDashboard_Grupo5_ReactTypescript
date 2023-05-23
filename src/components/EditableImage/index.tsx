import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Box, IconButton, useTheme } from '@mui/material'

import { BsImage } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

interface State {
  imageUrl: string
  fileImage: File | null
}

interface Props {
  src: string
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

const EditableImage: FC<Props> = ({
  src,
  width,
  height,
  borderRadius,
  name,
  dataInEditing,
  register,
  setDataInEditing,
  setValue
}) => {
  const [imageUrl, setImageUrl] = useState<State['imageUrl']>(src)

  const theme = useTheme()

  const inEditing = dataInEditing.includes(name)

  const handleCancelChanged = () => {
    setValue(name, null)
    setImageUrl(src)
    setDataInEditing(namesInEditing =>
      namesInEditing.filter(nameInEditing => nameInEditing !== name)
    )
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageSelected = e.target.files?.[0]

    if (!imageSelected) {
      handleCancelChanged()
      return
    }

    setImageUrl(URL.createObjectURL(imageSelected))
    setValue(name, imageSelected)
    setDataInEditing(namesInEditing => [...namesInEditing, name])
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        display: 'block'
      }}
    >
      <img
        src={imageUrl}
        width={width}
        height={height}
        style={{
          borderRadius,
          objectFit: 'cover',
          border: inEditing
            ? `solid ${theme.palette.primary.main} 3px`
            : 'solid black 1px'
        }}
      />
      <input
        type='file'
        id={name}
        accept='image/png, image/jpeg'
        style={{ display: 'none' }}
        {...register(name)}
        onChange={handleChangeImage}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {inEditing ? (
          <IconButton color='error' onClick={() => handleCancelChanged()}>
            <AiOutlineClose />
          </IconButton>
        ) : (
          <IconButton color='info'>
            <label htmlFor={name} style={{ cursor: 'pointer' }}>
              <BsImage />
            </label>
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default EditableImage
