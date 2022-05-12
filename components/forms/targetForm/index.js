import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from 'components/input'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import { defaultValues, schema } from './schema'
import styles from '../form.module.css'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from 'components/autocomplete'
import { useLists } from 'providers/listProvider'

const TargetForm = ({ open, onClose, list, loading, title, onSubmit }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: list?.id ? list : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { targetTypes = [] } = useLists()

  useEffect(() => {
    reset(list?._id ? list : defaultValues)
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
      <DialogTitle id='responsive-dialog-title' className={styles.modalTitle}>
        {list?._id ? 'Editar ' : 'Crear '}{title}
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
          <div className={styles.inputGroups}>
            <ControllerField
              name='name'
              label='Objetivo'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='category'
              label='Seleccione la categoria'
              control={control}
              element={Autocomplete}
              options={targetTypes}
              error={Boolean(errors?.category?.message)}
              helperText={errors?.category?.message}
              multiple
            />
          </div>
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

export default TargetForm
