import { ChangeEvent, FC } from 'react'

import { UseFormRegister } from 'react-hook-form'

import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
  useTheme
} from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import { AiOutlineClose } from 'react-icons/ai'

interface IOptionsSelect {
  id: number
  name: string
}

interface Props {
  onToggle?: () => void
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  value?: string | number
  name?: string
  variant?: Variant
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  defaultValue: number
  isLoading: boolean
  isError: boolean
  options: IOptionsSelect[] | undefined
}

const EditableSelectValue: FC<Props> = ({
  name,
  variant,
  onToggle,
  onChange,
  register,
  defaultValue,
  options,
  isLoading,
  isError
}) => {
  const theme = useTheme()

  return (
    <FormControl variant='standard' fullWidth>
      <Select
        {...register(name || 'category', { value: defaultValue, onChange })}
        defaultValue={defaultValue}
        sx={{ fontSize: theme.typography[variant || 'body1'].fontSize }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton color='error' onClick={onToggle}>
              <AiOutlineClose />
            </IconButton>
          </InputAdornment>
        }
      >
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Typography>Error</Typography>
        ) : options ? (
          options.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))
        ) : null}
      </Select>
    </FormControl>
  )
}

export default EditableSelectValue
