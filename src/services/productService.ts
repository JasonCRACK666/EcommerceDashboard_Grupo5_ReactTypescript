import axios from 'axios'

import IProduct from '../interfaces/product/IProduct'
import IPaginationResponse from '../interfaces/IPaginationResponse'
import IMessageResponse from '../interfaces/IMessageResponse'

import { getToken } from '../utils/getToken'

const productEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/products'
})

export const getAllProducts = async (): Promise<
  IPaginationResponse<IProduct[]>
> => {
  const res = await productEndpoint.get<IPaginationResponse<IProduct[]>>('')
  return res.data
}

export const deleteProduct = async (
  productId: number
): Promise<IMessageResponse> => {
  const res = await productEndpoint.delete<IMessageResponse>(`/${productId}`, {
    headers: {
      Authorization: getToken()
    }
  })

  return res.data
}
