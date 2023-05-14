import ICategory from '../category/ICategory'
import IBrand from '../brand/IBrand'
import IImage from '../image/IImage'
import IColor from '../color/IColor'

export default interface IDetailProduct {
  id: number
  title: string
  description: string
  originalPrice: number
  discountRate: number | null
  pointValue: number
  quantity: number
  sold: number
  publicationDate: string
  category: ICategory
  brand: IBrand
  images: IImage[]
  colors: IColor[]
}
