import { useCallback, useState } from 'react'
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
import { defaultValues, schema, setList } from './schema'
import styles from './publisherForm.module.css'
import { IconButton } from '@mui/material'
import { useSWRConfig } from 'swr'

const setFormats = (data) => {
  return data.map(({
    format,
    objective,
    pricePerUnit,
    biddingModel,
    device
  }) => {
    return {
      format: format?.id,
      objective: objective?.id,
      pricePerUnit,
      biddingModel: biddingModel,
      device: device
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
      objective: null,
      pricePerUnit: '',
      biddingModel: null,
      device: null
    }]
  })

  const { replace } = useRouter()

  const { locations = [], formats = [], ages = [], objectives = [], sex = [], devices = [], biddingModel = [] } = useLists()
  const { mutate } = useSWRConfig()

  const [preview, setPreview] = useState(null)

  const { loading, mutateWithImage, mutateHandler } = useMutateHandler()

  const onSuccess = useCallback(({ data }) => {
    publisher?.id && mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/publishers/${publisher?.id}`, data)
    replace('/publishers')
  }, [replace, mutate, publisher])

  const onSubmit = ({ id, locations, ageRange, formats, ...values }) => {
    const payload = {
      locations: setList(locations),
      ageRange: setList(ageRange),
      formats: setFormats(formats),
      ...values
    }

    const [path, method] = !id ? ['/publishers', 'POST'] : [`/publishers/${id}`, 'PUT']

    if (id) return mutateHandler({ path, method, body: payload, onSuccess })

    const body = new window.FormData()

    body.append('publisher', JSON.stringify(payload))
    if (preview?.image) body.append('image', preview?.image)

    mutateWithImage({ path, method, body, onSuccess })
  }

  const handleAdded = () => {
    append({
      format: null,
      objective: null,
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
      <Typography className={styles.title} align='center'>Publisher</Typography>
      {!edit && <UploadFile preview={preview?.url} setPreview={setPreview} />}
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
          element={Input}
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
                         name={`formats.${index}.objective`}
                         label='Objetivo'
                         control={control}
                         element={Autocomplete}
                         options={objectives}
                         error={Boolean(errors?.formats?.[index]?.objective?.message)}
                         helperText={`${errors?.formats?.[index]?.objective?.message || ''}`}
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
                         element={Input}
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
