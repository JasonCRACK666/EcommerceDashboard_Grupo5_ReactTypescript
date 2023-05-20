import axios from 'axios'

import ICategory from '../interfaces/category/ICategory'

const categoryEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/categories'
})

export const getAllCategories = async (): Promise<ICategory[]> => {
  const res = await categoryEndpoint.get<{ data: ICategory[] }>('')
  return res.data.data
}
