import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

const TextMaskCustom = forwardRef(function TextMaskCustom (props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask='num'
      definitions={{
        '#': /[1-9]/
      }}
      blocks={{
        num: {
          mask: Number,
          max: 999999999,
          thousandsSeparator: ','
        }
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

export default TextMaskCustom
