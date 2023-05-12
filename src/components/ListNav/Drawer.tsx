import { FC, useContext } from 'react'

import { ResizeListNavContext } from '../../context/ResizeListNavProvider'

import ListNav from '.'

import { Drawer } from '@mui/material'

const ListNavDrawer: FC = () => {
  const { isOpen, handleClose } = useContext(ResizeListNavContext)

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { width: '220px' } }}
    >
      <ListNav />
    </Drawer>
  )
}

export default ListNavDrawer
