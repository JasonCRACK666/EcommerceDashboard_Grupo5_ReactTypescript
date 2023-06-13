import axios from 'axios'

import IUser from '../interfaces/user/IUser'
import IPaginationResponse from '../interfaces/IPaginationResponse'

import { getToken } from '../utils/getToken'

const userEndpointWithToken = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  headers: {
    Authorization: getToken()
  }
})

export const getAllUsers = async (): Promise<IUser[]> => {
  const res = await userEndpointWithToken.get<IPaginationResponse<IUser>>('')
  return res.data.data
}
