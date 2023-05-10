import axios from 'axios'
import ILoginSendData from '../interfaces/auth/ILoginSendData'
import ILoginResponse from '../interfaces/auth/ILoginResponse'

const authEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/auth'
})

export const login = async (
  loginData: ILoginSendData
): Promise<ILoginResponse> => {
  const res = await authEndpoint.post<ILoginResponse>('/login', loginData)
  return res.data
}
