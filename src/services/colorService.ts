import axios from 'axios'
import IColor from '../interfaces/color/IColor'
import IMessageResponse from '../interfaces/IMessageResponse'
import { getToken } from '../utils/getToken'

const colorEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/colors'
})

export const getAllColors = async (): Promise<IColor[]> => {
  const res = await colorEndpoint.get<{ data: IColor[] }>('')
  return res.data.data
}

export const deleteColor = async (
  colorId: number
): Promise<IMessageResponse> => {
  const res = await colorEndpoint.delete<IMessageResponse>(`/${colorId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return res.data
}
