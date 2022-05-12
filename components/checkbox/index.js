import CheckboxMUI from '@mui/material/Checkbox'

const Checkbox = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <CheckboxMUI
      {...props}
    />
  </div>
)

export default Checkbox
