import ICategory from '../category/ICategory'
import IBrand from '../brand/IBrand'
import IImage from '../image/IImage'
import IColor from '../color/IColor'

export default interface IProduct {
  id: number
  title: string
  originalPrice: number
  discountRate: number | null
  pointValue: number
  quantity: number
  publicationDate: string
  category: ICategory
  brand: IBrand
  image: IImage
  colors: IColor[]
}
