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
import useMutateHandler from 'hooks/useMutateHandler'

import { useLists } from 'providers/listProvider'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { defaultValues, schema, setList } from './schema'
import styles from '../form.module.css'
import { Avatar, IconButton } from '@mui/material'
import { useSWRConfig } from 'swr'
import CurrencyInput from 'components/currencyInput'
import { BASE_URL } from 'utils/constants'

const setFormats = (data) => {
  return data.map(({
    format,
    target,
    pricePerUnit,
    biddingModel,
    device
  }) => {
    return {
      format: format?.id,
      target: target?.id,
      pricePerUnit,
      biddingModel: biddingModel?.id,
      device: device?.id
    }
  })
}

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

  const { loading, mutateHandler } = useMutateHandler()

  const onSuccess = useCallback(({ data }) => {
    // publisher?.id && mutate(`${BASE_URL}/publishers/${publisher?.id}`, data)
    // replace('/publishers')
  }, [replace, mutate, publisher])

  const onSubmit = ({ id, locations, ageRange, sex, category, formats, ...values }) => {
    const payload = {
      ...values,
      locations: setList(locations),
      ageRange: setList(ageRange),
      sex: sex?.id,
      category: category?.id,
      formats: setFormats(formats)
    }

    mutateHandler({ path: `/publishers/${id}`, method: 'PUT', body: payload, onSuccess })
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
      <Typography className={styles.title} align='center'>Editar Publisher</Typography>

      <div className={styles.avatar}>
        <Avatar src={publisher?.logo} sx={{ width: 90, height: 90 }} />
      </div>

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
