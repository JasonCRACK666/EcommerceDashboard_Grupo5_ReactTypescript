export default interface IPaginationResponse<T> {
  data: T[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}
