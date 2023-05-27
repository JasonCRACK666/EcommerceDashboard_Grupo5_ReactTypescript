import { FC } from 'react'

import { Box, Grid, IconButton } from '@mui/material'

import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  removeImage: (index: number) => void
  image: string
  index: number
}

const ImageSelectItem: FC<Props> = ({ image, index, removeImage }) => {
  return (
    <Grid item xs={4}>
      <Box sx={{ position: 'relative' }}>
        <img
          src={image}
          width={'100%'}
          height={350}
          style={{
            border: 'solid purple 2px',
            borderRadius: '10px',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <IconButton
            color='error'
            sx={{ fontSize: 35 }}
            onClick={() => removeImage(index)}
          >
            <AiOutlineClose />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  )
}

export default ImageSelectItem
