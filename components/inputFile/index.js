import Typography from 'components/typography'
import Input from 'components/input'
import styles from './inputFile.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const InputFile = ({ label, id, onChange, accept = 'image/*', value, ...props }) => {
  const hanldeOnChange = ({ target }) => {
    const file = target.files[0]
    if (file) return onChange(file)
  }

  return (
    <label htmlFor={id} className={styles.label}>
      <Input accept={accept} id={id} type='file' onChange={hanldeOnChange} {...props} className={styles.inputFile} />
      <span>{label}: {value && <Typography component='span' className={styles.value}>{value}</Typography>}</span>
      <CloudUploadIcon color='primary' />
    </label>
  )
}

export default InputFile
