import Input from 'components/input'
import TextMaskCustom from './maskInput'
import { forwardRef } from 'react'

const MasketInput = forwardRef(({ value, onChange, label, name, ...props }, ref) => (
  <Input
    label={label}
    value={value}
    fullWidth
    onChange={({ target }) => {
      const value = target.value
      if (value === '') return onChange(null)
      onChange(value)
    }}
    name={name}
    {...props}
    InputProps={{
      inputComponent: TextMaskCustom
    }}
  />
))

export default MasketInput
