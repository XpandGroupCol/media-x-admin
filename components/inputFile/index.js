import Typography from 'components/typography'
import Input from 'components/input'
import styles from './inputFile.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { forwardRef } from 'react'

const InputFile = forwardRef(({ label, id, onChange, accept = 'image/*', value, ...props }, ref) => {
  const hanldeOnChange = ({ target }) => {
    const file = target.files[0]
    if (file) return onChange(file)
  }

  const fileName = value?.name || ''

  return (
    <label htmlFor={id} className={styles.label}>
      <Input accept={accept} id={id} onChange={hanldeOnChange} type='file' {...props} className={styles.inputFile} />
      <span>{label}: {value && <Typography component='span' className={styles.value}>{fileName}</Typography>}</span>
      <CloudUploadIcon color='primary' />
    </label>
  )
})

export default InputFile
