import { FC, ReactNode, createContext, useState } from 'react'

interface InitialValue {
  isOpen: boolean
  productSelected: number | null
  handleClose: () => void
  handleOpen: (productId: number) => void
}

export const ProductDetailModalContext = createContext<InitialValue>({
  isOpen: false,
  productSelected: null,
  handleClose: () => {
    return
  },
  handleOpen: () => {
    return
  }
})

interface Props {
  children: ReactNode
}

const ProductDetailModalProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<InitialValue['isOpen']>(false)
  const [productSelected, setProductSelected] =
    useState<InitialValue['productSelected']>(null)

  const handleOpen: InitialValue['handleOpen'] = productId => {
    setProductSelected(productId)
    setIsOpen(true)
  }

  const handleClose: InitialValue['handleClose'] = () => {
    setIsOpen(false)
  }

  return (
    <ProductDetailModalContext.Provider
      value={{
        isOpen,
        handleClose,
        handleOpen,
        productSelected
      }}
    >
      {children}
    </ProductDetailModalContext.Provider>
  )
}

export default ProductDetailModalProvider
