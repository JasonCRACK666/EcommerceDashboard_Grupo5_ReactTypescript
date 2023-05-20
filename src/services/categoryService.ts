import axios from 'axios'

import ICategory from '../interfaces/category/ICategory'
import IMessageResponse from '../interfaces/IMessageResponse'
import { getToken } from '../utils/getToken'

const categoryEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/categories'
})

export const getAllCategories = async (): Promise<ICategory[]> => {
  const res = await categoryEndpoint.get<{ data: ICategory[] }>('')
  return res.data.data
}

export const deleteCategory = async (
  categoryId: number
): Promise<IMessageResponse> => {
  const res = await categoryEndpoint.delete<IMessageResponse>(
    `/${categoryId}`,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return res.data
}
