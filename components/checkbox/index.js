import CheckboxMUI from '@mui/material/Checkbox'
import { forwardRef } from 'react'
import styles from './checkbox.module.css'

const Checkbox = forwardRef(({ label, id = 'checked', ...props }, ref) => (
  <div className={styles.check}>
    <CheckboxMUI
      {...props}
      id={id}
    />
    <label htmlFor={id}>{label}</label>
  </div>
))

export default Checkbox
