import { FC, ReactNode, createContext, useState } from 'react'

import { Alert, AlertColor, Snackbar } from '@mui/material'

interface InitialValues {
  openDetail: boolean
  selected: number | null
  alertMessage: string | null
  showMessage: boolean
  typeAlert: AlertColor
  handleCloseDetail: () => void
  handleOpenDetail: (brandId: number) => void
  setAlertMessage: (message: string | null) => void
  setShowMessage: (value: boolean) => void
  setTypeAlert: (value: AlertColor) => void
}

export const ManageContext = createContext<InitialValues>({
  openDetail: false,
  selected: null,
  alertMessage: null,
  showMessage: false,
  typeAlert: 'success',
  handleCloseDetail: () => {
    return
  },
  handleOpenDetail: () => {
    return
  },
  setAlertMessage: () => {
    return
  },
  setShowMessage: () => {
    return
  },
  setTypeAlert: () => {
    return
  }
})

interface Props {
  children: ReactNode
}

const ManageProvider: FC<Props> = ({ children }) => {
  const [showMessage, setShowMessage] =
    useState<InitialValues['showMessage']>(false)
  const [alertMessage, setAlertMessage] =
    useState<InitialValues['alertMessage']>(null)
  const [typeAlert, setTypeAlert] =
    useState<InitialValues['typeAlert']>('success')

  const [openDetail, setOpenDetail] =
    useState<InitialValues['openDetail']>(false)
  const [selected, setSelected] = useState<InitialValues['selected']>(null)

  const handleOpenDetail: InitialValues['handleOpenDetail'] = productId => {
    setSelected(productId)
    setOpenDetail(true)
  }

  const handleCloseDetail: InitialValues['handleCloseDetail'] = () => {
    setOpenDetail(false)
    setSelected(null)
  }

  return (
    <ManageContext.Provider
      value={{
        selected,
        openDetail,
        alertMessage,
        showMessage,
        typeAlert,
        setAlertMessage,
        setShowMessage,
        setTypeAlert,
        handleCloseDetail,
        handleOpenDetail
      }}
    >
      {children}
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={() => setShowMessage(false)}
      >
        <Alert onClose={() => setShowMessage(false)} severity={typeAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </ManageContext.Provider>
  )
}

export default ManageProvider
