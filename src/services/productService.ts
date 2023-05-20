import axios from 'axios'

import IProduct from '../interfaces/product/IProduct'
import IDetailProduct from '../interfaces/product/IDetailProduct'
import IPaginationResponse from '../interfaces/IPaginationResponse'
import IMessageResponse from '../interfaces/IMessageResponse'
import IUpdateProductInitialValues from '../interfaces/product/IUpdateProductInitialValues'

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

export const getProduct = async (
  productId: number | null
): Promise<IDetailProduct> => {
  const res = await productEndpoint.get<IDetailProduct>(String(productId))
  return res.data
}

export const updateProduct = async (
  productId: number,
  dataProduct: IUpdateProductInitialValues
): Promise<IDetailProduct> => {
  const res = await productEndpoint.patch<IDetailProduct>(
    `/${productId}`,
    dataProduct,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
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
