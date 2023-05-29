import axios from 'axios'

import IBrand from '../interfaces/brand/IBrand'
import IDetailBrand from '../interfaces/brand/IDetailBrand'
import IMessageResponse from '../interfaces/IMessageResponse'

import { getToken } from '../utils/getToken'

const brandEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/brands'
})

export const getAllBrands = async (): Promise<IBrand[]> => {
  const res = await brandEndpoint.get<{ data: IBrand[] }>('')
  return res.data.data
}

export const getBrand = async (
  brandId: number | null
): Promise<IDetailBrand> => {
  const res = await brandEndpoint.get<IDetailBrand>(`/${brandId}`)
  return res.data
}

export const createBrand = async (
  brandData: FormData
): Promise<IDetailBrand> => {
  const res = await brandEndpoint.post<IDetailBrand>('', brandData, {
    headers: {
      Authorization: getToken()
    }
  })

  return res.data
}

export const updateBrand = async (
  brandId: number,
  brandFormData: FormData
): Promise<IDetailBrand> => {
  const res = await brandEndpoint.patch<IDetailBrand>(
    `/${brandId}`,
    brandFormData,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )

  return res.data
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
