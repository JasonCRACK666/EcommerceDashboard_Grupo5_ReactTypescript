import axios from 'axios'

import IColor from '../interfaces/color/IColor'
import ICreateColor from '../interfaces/color/ICreateColor'
import IUpdateColor from '../interfaces/color/IUpdateColor'
import IMessageResponse from '../interfaces/IMessageResponse'

import { getToken } from '../utils/getToken'

const colorEndpoint = axios.create({
  baseURL: 'http://localhost:8080/api/colors'
})

export const getAllColors = async (): Promise<IColor[]> => {
  const res = await colorEndpoint.get<{ data: IColor[] }>('')
  return res.data.data
}

export const getColor = async (colorId: number | null): Promise<IColor> => {
  const res = await colorEndpoint.get<IColor>(`/${colorId}`)
  return res.data
}

export const createColor = async (colorData: ICreateColor): Promise<IColor> => {
  const res = await colorEndpoint.post<IColor>('', colorData, {
    headers: {
      Authorization: getToken()
    }
  })

  return res.data
}

export const updateColor = async (
  colorId: number,
  colorData: IUpdateColor
): Promise<IColor> => {
  const res = await colorEndpoint.put(`/${colorId}`, colorData, {
    headers: {
      Authorization: getToken()
    }
  })

  return res.data
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
