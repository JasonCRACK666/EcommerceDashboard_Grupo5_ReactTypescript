import { FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllBrands } from '../../services/brandService'

import IBrand from '../../interfaces/brand/IBrand'
import IErrorResponse from '../../interfaces/IErrorResponse'

import { UseFormRegister } from 'react-hook-form'

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

interface Props {
  register: UseFormRegister<any>
  error?: boolean
  errorMessage?: string
}

const BrandSelectField: FC<Props> = ({ register, error, errorMessage }) => {
  const { data: brands } = useQuery<IBrand[], AxiosError<IErrorResponse>>({
    queryKey: ['brands'],
    queryFn: getAllBrands,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <FormControl fullWidth>
      <InputLabel id='select-brand-label' error={error}>
        Marca
      </InputLabel>
      <Select
        {...register('brand')}
        labelId='select-brand-label'
        id='select-brand'
        defaultValue={''}
        error={error}
        label='Marca'
      >
        {brands &&
          brands.map(brand => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
      </Select>

      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default BrandSelectField
