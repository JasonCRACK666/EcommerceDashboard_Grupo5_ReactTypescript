import { FC, ReactNode } from 'react'

import { Box, Modal, Paper } from '@mui/material'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const CardModal: FC<Props> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Paper sx={{ p: 5, minWidth: '600px' }}>{children}</Paper>
      </Box>
    </Modal>
  )
}

export default CardModal
