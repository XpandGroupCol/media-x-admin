import { useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'
import Button from 'components/button'
import Typography from 'components/typography'
import UploadFile from 'components/uploadFile'
import useMutateHandler from 'hooks/useMutateHandler'

import { useLists } from 'providers/listProvider'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { defaultValues, schema } from './schema'
import styles from '../form.module.css'
import { IconButton } from '@mui/material'
import { useSWRConfig } from 'swr'
import CurrencyInput from 'components/currencyInput'
import { getFormats } from 'utils'
import { BASE_URL } from 'utils/constants'

const PublisherForm = ({ publisher = defaultValues, edit = false }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...publisher },
    resolver: yupResolver(schema)
  })

  const { fields = [], append, remove } = useFieldArray({
    control,
    name: 'formats',
    defaultValues: [{
      format: null,
      target: null,
      pricePerUnit: '',
      biddingModel: null,
      device: null
    }]
  })

  const { replace } = useRouter()

  const { locations = [], formats = [], ages = [], targets = [], sex = [], devices = [], biddingModel = [], publisherCategory = [] } = useLists()
  const { mutate } = useSWRConfig()

  const { loading, mutateWithImage } = useMutateHandler()

  const onSuccess = useCallback(({ data }) => {
    // publisher?.id && mutate(`${BASE_URL}/publishers/${publisher?.id}`, data)
    // replace('/publishers')
  }, [replace, mutate, publisher])

  const onSubmit = (values) => {
    const formData = new window.FormData()

    const { formats } = values
    const _formats = getFormats(formats)

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'locations' || key === 'ageRange') {
        value.forEach((v, i) => {
          formData.append(`${key}[${i}]`, v?.id ?? '')
        })
        return
      }

      if (key === 'sex' || key === 'category') {
        formData.append(key, value?.id ?? '')
        return
      }

      if (key === 'formats') {
        _formats.forEach(({ format, target, pricePerUnit, biddingModel, device }, i) => {
          formData.append(`${key}[${i}][format]`, format ?? '')
          formData.append(`${key}[${i}][target]`, target ?? '')
          formData.append(`${key}[${i}][pricePerUnit]`, pricePerUnit ?? '')
          formData.append(`${key}[${i}][biddingModel]`, biddingModel ?? '')
          formData.append(`${key}[${i}][device]`, device ?? '')
        })
        return
      }

      formData.append(key, value ?? '')
    })

    mutateWithImage({ path: '/publishers', method: 'POST', body: formData, onSuccess })
  }

  const handleAdded = () => {
    append({
      format: null,
      target: null,
      pricePerUnit: '',
      biddingModel: null,
      device: null
    })
  }

  const handleRemove = (index) => () => {
    remove(index)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={styles.title} align='center'>Nuevo Publisher</Typography>

      {!edit && (
        <ControllerField
          name='image'
          label='Subir logo'
          control={control}
          element={UploadFile}
          id='upload-logo'
        />)}
      <div className={styles.inputGroups}>
        <ControllerField
          name='publisher'
          label='Nombres'
          control={control}
          element={Input}
          error={Boolean(errors?.publisher?.message)}
          helperText={errors?.publisher?.message}
        />
        <ControllerField
          name='miniBudget'
          label='Inversion minima'
          control={control}
          element={CurrencyInput}
          error={Boolean(errors?.miniBudget?.message)}
          helperText={errors?.miniBudget?.message}
        />

      </div>
      <ControllerField
        name='locations'
        label='Ubicaciones'
        control={control}
        element={Autocomplete}
        options={locations}
        multiple
        error={Boolean(errors?.locations?.message)}
        helperText={errors?.locations?.message}
      />

      <div className={styles.inputGroups}>
        <ControllerField
          name='sex'
          label='Sexo'
          control={control}
          element={Autocomplete}
          options={sex}
          error={Boolean(errors?.sex?.message)}
          helperText={errors?.sex?.message}
        />
        <ControllerField
          name='ageRange'
          label='Rango de edades'
          control={control}
          element={Autocomplete}
          options={ages}
          multiple
          error={Boolean(errors?.ageRange?.message)}
          helperText={errors?.ageRange?.message}
        />
        <ControllerField
          name='category'
          label='Seleccione una categoria'
          control={control}
          element={Autocomplete}
          options={publisherCategory}
          error={Boolean(errors?.category?.message)}
          helperText={errors?.category?.message}
        />
      </div>
      <span className={styles.divider} />

      <div style={{ width: '100%' }}>
        <div className={styles.added}>
          <Typography>Formatos</Typography>
          <Button variant='contained' color='secondary' size='small' onClick={handleAdded}>
            <AddIcon />
          </Button>
        </div>
        <div className={styles.tableContainer}>

          <table className={styles.table}>
            <thead>
              <tr>
                <th><Typography align='left'>Formato</Typography></th>
                <th><Typography align='left'>Objetivo</Typography></th>
                <th><Typography align='left'>Modelo</Typography></th>
                <th><Typography align='left'>Dispositivo</Typography></th>
                <th><Typography align='left'>Precio por unidad</Typography></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                 fields.map(({
                   id
                 }, index) => (
                   <tr key={id}>
                     <td width='20%'>
                       <ControllerField
                         name={`formats.${index}.format`}
                         label='Formato'
                         control={control}
                         element={Autocomplete}
                         options={formats}
                         error={Boolean(errors?.formats?.[index]?.format?.message)}
                         helperText={`${errors?.formats?.[index]?.format?.message || ''}`}
                       />
                     </td>
                     <td width='30%'>
                       <ControllerField
                         name={`formats.${index}.target`}
                         label='Objetivo'
                         control={control}
                         element={Autocomplete}
                         options={targets}
                         error={Boolean(errors?.formats?.[index]?.target?.message)}
                         helperText={`${errors?.formats?.[index]?.target?.message || ''}`}
                       />

                     </td>
                     <td width='15%'>
                       <ControllerField
                         name={`formats.${index}.biddingModel`}
                         label='Modelo'
                         control={control}
                         element={Autocomplete}
                         options={biddingModel}
                         error={Boolean(errors?.formats?.[index]?.biddingModel?.message)}
                         helperText={`${errors?.formats?.[index]?.biddingModel?.message || ''}`}
                       />

                     </td>

                     <td width='15%'>
                       <ControllerField
                         name={`formats.${index}.device`}
                         label='Dispositivos'
                         control={control}
                         element={Autocomplete}
                         options={devices}
                         error={Boolean(errors?.formats?.[index]?.device?.message)}
                         helperText={`${errors?.formats?.[index]?.device?.message || ''}`}
                       />
                     </td>
                     <td width='15%'>
                       <ControllerField
                         name={`formats.${index}.pricePerUnit`}
                         label='Precio unitario'
                         control={control}
                         element={CurrencyInput}
                         error={Boolean(errors?.formats?.[index]?.pricePerUnit?.message)}
                         helperText={`${errors?.formats?.[index]?.pricePerUnit?.message || ''}`}
                       />
                     </td>
                     <td>
                       <IconButton size='small' className={styles.deleteIcon} onClick={handleRemove(index)}>
                         <CloseIcon />
                       </IconButton>
                     </td>
                   </tr>
                 ))
                }
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.buttons}>
        <Link href='/publishers'>
          <a>
            <Button variant='outlined' color='secondary' size='large' className={styles.button}>
              Cancelar
            </Button>
          </a>
        </Link>

        <Button loading={loading} type='submit' variant='contained' color='primary' size='large' className={styles.button}>
          Continuar
        </Button>
      </div>
    </form>

  )
}

export default PublisherForm
