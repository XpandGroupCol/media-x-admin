import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import useMutateHandler from 'hooks/useMutateHandler'

import { defaultValues, schema } from './schema'
import styles from './userForm.module.css'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Image from 'next/image'
import useLists from 'hooks/useLists'
const userForm = ({ open, onClose, onSuccess }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { locations, formats, ages, objectives } = useLists()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const { loading, mutateHandler } = useMutateHandler()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const onSubmit = ({ role, ...user }) => {
    const body = { ...user, role: role.id }
    mutateHandler({ path: '/api/users', method: 'POST', body, onSuccess })
  }

  useEffect(() => {
    if (!open) reset()
  }, [open])

  const handleSetImage = ({ target }) => {
    const file = target.files[0]
    if (file && file.type.substr(0, 5) === 'image') { return setImage(file) }
    setImage(null)
  }

  useEffect(() => {
    if (image) {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(null)
    }
  }, [image])

  return (

    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      maxWidth='sm'
      fullWidth
    >

      <DialogTitle id='responsive-dialog-title' className={styles.title}>
        Nuevo usuario
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>

      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.picture}>
            {
            preview
              ? <Image src={preview} width={80} height={80} className={styles.previewImage} />
              : (
                <div className={styles.uploadFile}>
                  <CloudUploadIcon color='primary' />
                </div>)
          }
            <Button size='small' color='primary'>
              <label htmlFor='contained-button-file'>
                <input className={styles.inputFile} type='file' accept='image/*' id='contained-button-file' onChange={handleSetImage} />
                Subir logo
              </label>
            </Button>
          </div>
          <section className={styles.section}>
            <ControllerField
              name='publisher'
              label='Nombres'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='locations'
              label='Ubicaciones'
              control={control}
              element={Autocomplete}
              options={locations}
              error={Boolean(errors?.locations?.message)}
              helperText={errors?.locations?.message}
            />
            <ControllerField
              name='ageRange'
              label='Rangos de edad'
              control={control}
              element={Autocomplete}
              options={ages}
              error={Boolean(errors?.ageRange?.message)}
              helperText={errors?.ageRange?.message}
            />
            <ControllerField
              name='sex'
              label='Sexo'
              control={control}
              element={Autocomplete}
              options={[]}
              error={Boolean(errors?.ageRange?.message)}
              helperText={errors?.ageRange?.message}
            />
            <ControllerField
              name='pricePerUnit'
              label='Precio unitario'
              control={control}
              element={Input}
              error={Boolean(errors?.pricePerUnit?.message)}
              helperText={errors?.pricePerUnit?.message}
            />
            <ControllerField
              name='miniBudget'
              label='Inversion minima'
              control={control}
              element={Input}
              error={Boolean(errors?.pricePerUnit?.message)}
              helperText={errors?.pricePerUnit?.message}
            />
            <ControllerField
              name='objective'
              label='Objetivo'
              control={control}
              element={Autocomplete}
              options={objectives}
              error={Boolean(errors?.ageRange?.message)}
              helperText={errors?.ageRange?.message}
            />
            <ControllerField
              name='device'
              label='Dispositivos'
              control={control}
              element={Autocomplete}
              options={[]}
              error={Boolean(errors?.device?.message)}
              helperText={errors?.device?.message}
            />
            <ControllerField
              name='formats'
              label='Dispositivos'
              control={control}
              element={Autocomplete}
              options={formats}
              error={Boolean(errors?.device?.message)}
              helperText={errors?.device?.message}
            />
          </section>

        </form>
      </DialogContent>
      <DialogActions className={styles.buttons}>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          Cancelar
        </Button>
        <Button type='submit' loading={loading} onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </DialogActions>

    </Dialog>

  )
}

export default userForm
