import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
  cloneElement,
  ReactElement,
  MouseEventHandler
} from 'react'

import { UseFormSetValue } from 'react-hook-form'

import { Box, Typography, useTheme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import { FiEdit } from 'react-icons/fi'

interface State {
  value: string | number
  showEditTextField: boolean
  showEditButton: boolean
}

interface Props {
  defaultValue: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  variant: Variant
  name: string
  dataInEditing: string[]
  setDataInEditing: Dispatch<SetStateAction<string[]>>
  children: ReactElement
}

const EditableValue: FC<Props> = ({
  defaultValue,
  variant,
  name,
  dataInEditing,
  setValue,
  setDataInEditing,
  children
}) => {
  const [currentValue, setCurrentValue] = useState<State['value']>(defaultValue)
  const [showEditButton, setShowEditButton] =
    useState<State['showEditButton']>(false)

  const theme = useTheme()

  const handleToggleEdit: MouseEventHandler<
    HTMLButtonElement | HTMLSpanElement
  > = () => {
    const isShowEditField = dataInEditing.includes(name)

    if (isShowEditField) {
      setCurrentValue(defaultValue)
      setValue(name, undefined)
      setDataInEditing(prev => prev.filter(dataEdit => dataEdit !== name))
      return
    }

    setDataInEditing(prev => [...prev, name])
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      typeof defaultValue === 'string' ? e.target.value : Number(e.target.value)
    setCurrentValue(value)
    setValue(name, value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {dataInEditing.includes(name) ? (
        cloneElement(children, {
          onChange: handleChange,
          onToggle: handleToggleEdit,
          name,
          value: currentValue,
          variant
        })
      ) : (
        <Typography
          variant={variant}
          py={0.5}
          onMouseEnter={() => setShowEditButton(true)}
          onMouseLeave={() => setShowEditButton(false)}
        >
          {currentValue}{' '}
          {showEditButton && (
            <span
              onClick={handleToggleEdit}
              style={{
                fontSize: theme.typography[variant].fontSize,
                cursor: 'pointer'
              }}
            >
              <FiEdit />
            </span>
          )}
        </Typography>
      )}
    </Box>
  )
}

export default EditableValue
