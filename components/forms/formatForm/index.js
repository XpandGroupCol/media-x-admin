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
import { useLists } from 'providers/listProvider'
import Autocomplete from 'components/autocomplete'

const FormatForm = ({ open, onClose, list, loading, title, onSubmit }) => {
  const { formState: { errors }, handleSubmit, control, reset, getValues, watch, setValue } = useForm({
    defaultValues: list?.id ? list : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { mediaFormats = [] } = useLists()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  watch('type')

  useEffect(() => {
    reset(list?._id ? list : defaultValues)
  }, [open])

  const values = getValues()

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
              label='Nombre'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='type'
              label='Seleccione el formato'
              control={control}
              element={Autocomplete}
              options={mediaFormats}
              error={Boolean(errors?.type?.message)}
              helperText={errors?.type?.message}
              onChange={(value) => {
                if (value.isVideo) {
                  setValue('width', 0)
                  setValue('height', 0)
                }
                setValue('type', value)
              }}
            />
          </div>
          <div className={styles.inputGroups}>
            <ControllerField
              name='width'
              label='Ingrese el ancho en PX'
              control={control}
              element={Input}
              error={Boolean(errors?.width?.message)}
              helperText={errors?.width?.message}
              disabled={values?.type?.isVideo}
              type='number'
              InputProps={{
                inputProps: {
                  min: 0
                }
              }}
            />
            <ControllerField
              name='height'
              label='Ingrese el alto en PX'
              control={control}
              element={Input}
              error={Boolean(errors?.height?.message)}
              helperText={errors?.height?.message}
              disabled={values?.type?.isVideo}
              type='number'
              InputProps={{
                inputProps: {
                  min: 0
                }
              }}
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

export default FormatForm
