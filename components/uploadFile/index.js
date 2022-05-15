
import Image from 'next/image'
import { forwardRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Input from 'components/input'
import styles from './uploadFile.module.css'
import { useNotification } from 'providers/notificationProvider'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

const UploadPreviewFile = forwardRef(({ label, id, onChange, accept = 'image', value, ...props }, ref) => {
  const [previewImagen, setPreviewImagen] = useState(null)
  const { notify } = useNotification()

  const handlePrviewImagen = (file) => {
    if (file?.name) {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setPreviewImagen(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewImagen(null)
    }
  }

  const hanldeOnChange = ({ target }) => {
    const file = target.files[0]

    if (file.type.substr(0, 5) !== 'image') {
      return notify({ type: 'error', message: 'Avatar debe ser una imagen' })
    }

    if (file) {
      onChange(file)
      handlePrviewImagen(file)
    }
  }

  const clear = () => {
    onChange({})
    handlePrviewImagen(null)
  }

  const fileName = value?.name || ''

  return (
    <div className={styles.uploadFile}>
      {previewImagen
        ? (
          <picture className={styles.picture}>
            <Image src={previewImagen} width={80} height={80} className={styles.previewImage} />
          </picture>
          )
        : (
          <label htmlFor={id} className={styles.file}>
            <Input accept={accept} id={id} onChange={hanldeOnChange} type='file' {...props} className={styles.inputFile} />
            <CloudUploadIcon color='primary' />
          </label>
          )}
      <div className={styles.clear}>
        <span>{fileName || label}</span>
        {fileName && (
          <IconButton size='small' onClick={clear}>
            <CloseIcon fontSize='small' />
          </IconButton>
        )}
      </div>
    </div>
  )
})

export default UploadPreviewFile
