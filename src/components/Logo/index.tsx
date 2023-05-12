import { FC } from 'react'

import { Typography } from '@mui/material'

import { BsCart4 } from 'react-icons/bs'

import { Variant } from '@mui/material/styles/createTypography'

interface Props {
  hideName?: boolean
  size: Variant
}

const Logo: FC<Props> = ({ hideName, size }) => {
  return (
    <Typography variant={size} display='flex' alignItems='center' gap={1}>
      <span style={{ fontSize: '2rem' }}>
        <BsCart4 />
      </span>{' '}
      {!hideName && (
        <Typography component='span' variant={'h6'}>
          Tech House
        </Typography>
      )}
    </Typography>
  )
}

export default Logo
