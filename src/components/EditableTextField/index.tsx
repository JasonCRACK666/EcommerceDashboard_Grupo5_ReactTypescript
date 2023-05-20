import { ChangeEvent, FC } from 'react'

import IUpdateProductInitialValues from '../../interfaces/product/IUpdateProductInitialValues'

import { UseFormRegister } from 'react-hook-form'

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  useTheme
} from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  onToggle?: () => void
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value?: string | number
  name?: keyof IUpdateProductInitialValues
  variant?: Variant
  register: UseFormRegister<IUpdateProductInitialValues>
  multiline?: boolean
  errorMessage: string | undefined
}

const EditableTextField: FC<Props> = ({
  value,
  name,
  variant,
  register,
  onToggle,
  onChange,
  multiline,
  errorMessage
}) => {
  const theme = useTheme()

  return (
    <FormControl variant='standard' fullWidth>
      <InputBase
        {...register(name || 'title', {
          onChange,
          value,
          valueAsNumber: typeof value === 'number'
        })}
        name={name}
        type={typeof value === 'string' ? 'text' : 'number'}
        sx={{ fontSize: theme.typography[variant || 'body1'].fontSize }}
        multiline={multiline}
        value={value}
        onChange={onChange}
        error={Boolean(errorMessage)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton color='error' onClick={onToggle}>
              <AiOutlineClose />
            </IconButton>
          </InputAdornment>
        }
      />

      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default EditableTextField
