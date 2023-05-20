import axios from 'axios'

import IBrand from '../interfaces/brand/IBrand'
import IMessageResponse from '../interfaces/IMessageResponse'
import { getToken } from '../utils/getToken'

const brandEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/brands'
})

export const getAllBrands = async (): Promise<IBrand[]> => {
  const res = await brandEndpoint.get<{ data: IBrand[] }>('')
  return res.data.data
}

export const deleteBrand = async (
  brandId: number
): Promise<IMessageResponse> => {
  const res = await brandEndpoint.delete<IMessageResponse>(`/${brandId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return res.data
}
