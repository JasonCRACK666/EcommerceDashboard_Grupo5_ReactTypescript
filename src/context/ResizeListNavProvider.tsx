import { FC, ReactNode, createContext, useState } from 'react'

interface InitialValues {
  isOpen: boolean
  handleToggleResize: () => void
  handleClose: () => void
}

export const ResizeListNavContext = createContext<InitialValues>({
  isOpen: true,
  handleToggleResize: () => {
    return
  },
  handleClose: () => {
    return
  }
})

interface Props {
  children: ReactNode
}

const ResizeListNavProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<InitialValues['isOpen']>(
    localStorage.getItem('isOpen') === null
      ? true
      : localStorage.getItem('isOpen')?.toLocaleLowerCase() === 'true'
  )

  const handleToggleResize: InitialValues['handleToggleResize'] = () => {
    setIsOpen(!isOpen)
    localStorage.setItem('isOpen', `${!isOpen}`)
  }

  const handleClose: InitialValues['handleClose'] = () => {
    setIsOpen(false)
    localStorage.setItem('isOpen', 'false')
  }

  return (
    <ResizeListNavContext.Provider
      value={{ isOpen, handleToggleResize, handleClose }}
    >
      {children}
    </ResizeListNavContext.Provider>
  )
}

export default ResizeListNavProvider
