export default interface ICreateProduct {
  title: string
  description: string
  originalPrice: number
  discountRate?: number
  pointValue: number
  quantity: number
  category: number
  brand: number
  images: File[]
  colors: number[]
}
