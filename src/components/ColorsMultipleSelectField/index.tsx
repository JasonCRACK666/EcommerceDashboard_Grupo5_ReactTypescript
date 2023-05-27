import { FC, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllColors } from '../../services/colorService'

import IColor from '../../interfaces/color/IColor'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useTheme
} from '@mui/material'

interface State {
  selectedColors: number[]
}

interface Props {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  error?: boolean
  errorMessage?: string
}

const ColorsMultipleSelectField: FC<Props> = ({
  error,
  errorMessage,
  register,
  setValue
}) => {
  const [selectedColors, setSelectedColors] = useState<State['selectedColors']>(
    []
  )

  const theme = useTheme()

  const { data: colors } = useQuery<IColor[], AxiosError<IErrorResponse>>({
    queryKey: ['colors'],
    queryFn: getAllColors,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  const getStylesOptions = (index: number, colors: readonly IColor[]) => {
    return {
      fontWeight:
        colors[index] === null
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    }
  }

  const handleChangeSelectColor = (e: SelectChangeEvent<number[]>) => {
    const { value } = e.target

    setValue('colors', value as number[])
    setSelectedColors(value as number[])
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='select-multiple-colors-label' error={error}>
        Colores
      </InputLabel>
      <Select
        {...register('colors', { onChange: handleChangeSelectColor })}
        value={selectedColors}
        onChange={handleChangeSelectColor}
        labelId='select-multiple-colors-label'
        id='select-multiple-colors'
        error={error}
        multiple
        input={<OutlinedInput id='select-multiple-colors' label='Colores' />}
        renderValue={(selectedIdColors: number[]) =>
          colors && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedIdColors.map(selectedIdColor => (
                <Chip
                  key={selectedIdColor}
                  label={
                    colors.find(color => color.id === selectedIdColor)?.name ??
                    ''
                  }
                  color='error'
                  sx={{
                    backgroundColor:
                      colors.find(color => color.id === selectedIdColor)?.hex ??
                      '',
                    border: 'solid black 1px',
                    color: 'white',
                    textShadow:
                      '2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
                  }}
                />
              ))}
            </Box>
          )
        }
      >
        {colors &&
          colors.map((color, index) => (
            <MenuItem
              key={color.id}
              value={color.id}
              style={getStylesOptions(index, colors)}
            >
              {color.name}
            </MenuItem>
          ))}
      </Select>

      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default ColorsMultipleSelectField
