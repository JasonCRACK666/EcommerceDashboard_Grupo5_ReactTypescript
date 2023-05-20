import axios from 'axios'

import IBrand from '../interfaces/brand/IBrand'

const brandEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/brands'
})

export const getAllBrands = async (): Promise<IBrand[]> => {
  const res = await brandEndpoint.get<{ data: IBrand[] }>('')
  return res.data.data
}
