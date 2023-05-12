import axios from 'axios'

import ILoginSendData from '../interfaces/auth/ILoginSendData'
import ILoginResponse from '../interfaces/auth/ILoginResponse'
import IUserMe from '../interfaces/auth/IUserMe'

import { getToken } from '../utils/getToken'

const authEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/auth'
})

export const login = async (
  loginData: ILoginSendData
): Promise<ILoginResponse> => {
  const res = await authEndpoint.post<ILoginResponse>('/login', loginData)
  return res.data
}

export const getMe = async (): Promise<IUserMe> => {
  const res = await authEndpoint.get<IUserMe>('/me', {
    headers: {
      Authorization: getToken()
    }
  })
  return res.data
}
