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

import UploadFile from 'components/uploadFile'
import { useLists } from 'providers/listProvider'

const userForm = ({ open, onClose, onSuccess }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const [preview, setPreview] = useState(null)

  const { loading, mutateWithImage } = useMutateHandler()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { roles = [] } = useLists()

  const onSubmit = ({ role, ...user }) => {
    const payload = { ...user, role: role.id }
    if (preview?.image) payload.image = preview?.image

    const body = new window.FormData()

    Object.entries(payload).forEach(([key, value]) => {
      body.append(key, value)
    })

    mutateWithImage({ path: '/users', method: 'POST', body, onSuccess })
  }

  useEffect(() => {
    if (!open) reset()
  }, [open])

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
          <UploadFile preview={preview?.url} setPreview={setPreview} />
          <section className={styles.section}>
            <ControllerField
              name='name'
              label='Nombres'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='lastName'
              label='Apellidos'
              control={control}
              element={Input}
              error={Boolean(errors?.lastName?.message)}
              helperText={errors?.lastName?.message}
            />
            <ControllerField
              name='email'
              label='Correo electronico'
              control={control}
              element={Input}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
            <ControllerField
              name='phone'
              label='Telefono'
              control={control}
              element={Input}
              error={Boolean(errors?.phone?.message)}
              helperText={errors?.phone?.message}
            />
          </section>
          <span className={styles.divider} />
          <section className={styles.section}>
            <ControllerField
              name='company'
              label='Empresa'
              control={control}
              element={Input}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
            <ControllerField
              name='nit'
              label='Nit'
              control={control}
              element={Input}
              error={Boolean(errors?.company?.message)}
              helperText={errors?.company?.message}
            />
            <ControllerField
              name='role'
              label='Rol'
              control={control}
              element={Autocomplete}
              options={roles}
              error={Boolean(errors?.role?.message)}
              helperText={errors?.role?.message}
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
