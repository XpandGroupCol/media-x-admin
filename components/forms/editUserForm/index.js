import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import useMutateHandler from 'hooks/useMutateHandler'

import { defaultValues, schema } from './schema'
import styles from './userForm.module.css'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import { useLists } from 'providers/listProvider'

const userForm = ({ open, onClose, user, onSuccess }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: user?.id ? { ...user } : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { roles = [], statuses = [] } = useLists()

  const { loading, mutateHandler } = useMutateHandler()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (open) reset(user?.id ? user : defaultValues)
  }, [open])

  const onSubmit = ({ role, status, id }) => {
    const body = { role: role.id, status: status.id }
    mutateHandler({ path: `/users/${id}`, method: 'PUT', body, onSuccess })
  }

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
        Editar usuario
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>

      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <ControllerField
              name='status'
              label='Estado'
              control={control}
              element={Autocomplete}
              options={statuses}
              error={Boolean(errors?.status?.message)}
              helperText={errors?.status?.message}
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
