import { forwardRef } from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'
import Input from 'components/input'
import { renderlist } from './listItems'
import Typography from 'components/typography'

const Autocomplete = forwardRef(({
  placeholder, options, label, multiple = false,
  value, onChange, error, helperText, ...props
}, ref) => (
  <MuiAutocomplete
    options={options}
    openOnFocus
    disableCloseOnSelect={multiple}
    onChange={(_, value) => onChange(value)}
    multiple={multiple}
    limitTags={1}
    renderTags={(values) => {
      if (values.length) {
        return (
          <Typography component='span'>
            {values.length > 1 ? 'varios seleccionados' : value[0].label}
          </Typography>
        )
      }
      return ''
    }}
    isOptionEqualToValue={(option, value) => option.id === value.id}
    value={value}
    fullWidth
    {...props}
    renderInput={(params) =>
      <Input label={label} error={error} helperText={helperText} {...params} />}
    renderOption={multiple ? renderlist : undefined}
  />
))

export default Autocomplete
