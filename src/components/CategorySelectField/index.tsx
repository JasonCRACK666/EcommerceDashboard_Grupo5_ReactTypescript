import { FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { AxiosError } from 'axios'
import { getAllCategories } from '../../services/categoryService'

import ICategory from '../../interfaces/category/ICategory'
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
  error?: boolean
  errorMessage?: string
  register: UseFormRegister<any>
}

const CategorySelectField: FC<Props> = ({ error, errorMessage, register }) => {
  const { data: categories } = useQuery<
    ICategory[],
    AxiosError<IErrorResponse>
  >({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <FormControl fullWidth>
      <InputLabel id='select-category-label' error={error}>
        Categoría
      </InputLabel>
      <Select
        {...register('category')}
        labelId='select-category-label'
        defaultValue={''}
        error={error}
        id='select-category'
        label='Categoría'
      >
        {categories &&
          categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
      </Select>

      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default CategorySelectField
