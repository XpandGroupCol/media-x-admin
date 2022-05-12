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
import { COUNTRIES_LIST } from 'utils/constants'

const mapList = ({ name, country, _id }) => ({
  name: name,
  country: { id: country, label: country },
  _id
})

const LocationForm = ({ open, onClose, list, loading, title, onSubmit }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: list?.id ? list : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    reset(list?._id ? mapList(list) : defaultValues)
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
              label='Ciudad'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='country'
              label='Seleccione el pais'
              control={control}
              element={Autocomplete}
              options={COUNTRIES_LIST}
              error={Boolean(errors?.country?.message)}
              helperText={errors?.country?.message}
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

export default LocationForm
