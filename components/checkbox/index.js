import CheckboxMUI from '@mui/material/Checkbox'
import styles from './checkbox.module.css'

const Checkbox = ({ label, id = 'checked', ...props }) => (
  <div className={styles.check}>
    <CheckboxMUI
      {...props}
      id={id}
    />
    <label htmlFor={id}>{label}</label>
  </div>
)

export default Checkbox
