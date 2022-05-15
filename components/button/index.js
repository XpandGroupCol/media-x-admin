import { CircularProgress } from '@mui/material'
import MuiButton from '@mui/material/Button'
import { forwardRef } from 'react'
import styles from './button.module.css'
const Button = forwardRef(({ children, loading, disabled, variant = 'contained', ...props }, ref) => {
  return (
    <MuiButton disabled={disabled || loading} variant={variant} disableElevation {...props} sx={{ position: 'relative' }}>
      {children}
      {loading && <CircularProgress size={22} className={styles.buttonProgress} />}
    </MuiButton>

  )
})

export default Button
