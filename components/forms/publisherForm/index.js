import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'
import Button from 'components/button'
import Typography from 'components/typography'
import UploadFile from 'components/uploadFile'
import useMutateHandler from 'hooks/useMutateHandler'

import { useLists } from 'providers/listProvider'

import { defaultValues, schema, setList } from './schema'
import styles from './publisherForm.module.css'

const PublisherForm = ({ publisher = defaultValues }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...publisher },
    resolver: yupResolver(schema)
  })

  const { replace } = useRouter()

  const { locations = [], formats = [], ages = [], objectives = [], sex = [], devices = [] } = useLists()

  const [preview, setPreview] = useState(null)

  const { loading, mutateHandler } = useMutateHandler()

  const onSuccess = useCallback(() => replace('/publishers'), [replace])

  const onSubmit = ({ locations, ageRange, formats, objective, id = null, ...values }) => {
    const body = {
      ...values,
      locations: setList(locations),
      ageRange: setList(ageRange),
      formats: setList(formats),
      objective: objective?.id
    }

    const [path, method] = !id ? ['/publishers', 'POST'] : [`/publishers/${id}`, 'PUT']

    mutateHandler({ path, method, body, onSuccess })
  }

  return (

    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={styles.title} align='center'>Publisher</Typography>
      <UploadFile preview={preview} setPreview={setPreview} />
      <ControllerField
        name='publisher'
        label='Nombres'
        control={control}
        element={Input}
        error={Boolean(errors?.publisher?.message)}
        helperText={errors?.publisher?.message}
      />
      <ControllerField
        name='objective'
        label='Objetivo'
        control={control}
        element={Autocomplete}
        options={objectives}
        error={Boolean(errors?.objective?.message)}
        helperText={errors?.objective?.message}
      />
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
      <ControllerField
        name='formats'
        label='Formatos'
        multiple
        control={control}
        element={Autocomplete}
        options={formats}
        error={Boolean(errors?.formats?.message)}
        helperText={errors?.formats?.message}
      />
      <span className={styles.divider} />
      <div className={styles.inputGroups}>
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
          error={Boolean(errors?.miniBudget?.message)}
          helperText={errors?.miniBudget?.message}
        />
      </div>

      <ControllerField
        name='ageRange'
        label='Rangos de edad'
        control={control}
        multiple
        element={Autocomplete}
        options={ages}
        error={Boolean(errors?.ageRange?.message)}
        helperText={errors?.ageRange?.message}
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
          name='device'
          label='Dispositivos'
          control={control}
          element={Autocomplete}
          options={devices}
          error={Boolean(errors?.device?.message)}
          helperText={errors?.device?.message}
        />
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
