import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import useMutateHandler from 'hooks/useMutateHandler'

import styles from './userForm.module.css'

import useLists from 'hooks/useLists'
import Typography from 'components/typography'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as yup from 'yup'
import UploadFile from 'components/uploadFile'

export const defaultValues = {
  publisher: '',
  locations: [],
  ageRange: [],
  sex: null,
  pricePerUnit: '',
  miniBudget: '',
  objective: null,
  device: null,
  formats: []
}

export const schema = yup.object({
  publisher: yup.string().required('Publisher es requerido.'),
  locations: yup.array().min(1, 'Ubicaciones es requerido').required('Ubicaciones es requerido'),
  ageRange: yup.array().min(1).required(),
  sex: yup.object().required().nullable(),
  pricePerUnit: yup.string().required(),
  miniBudget: yup.string().required(),
  objective: yup.object().required().nullable(),
  device: yup.object().required().nullable(),
  formats: yup.array().min(1).required()
}).required()
const setList = (list) => list.map(({ id }) => id)

const userForm = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { locations = [], formats = [], ages = [], objectives = [], sex = [], devices } = useLists()
  const { replace } = useRouter()

  const [preview, setPreview] = useState(null)

  const { loading, mutateHandler } = useMutateHandler()

  const onSuccess = useCallback(() => replace('/publishers'), [replace])

  const onSubmit = ({ locations, ageRange, formats, objective, ...values }) => {
    const body = {
      ...values,
      locations: setList(locations),
      ageRange: setList(ageRange),
      formats: setList(formats),
      objective: objective?.id
    }
    mutateHandler({ path: '/publishers', method: 'POST', body, onSuccess })
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

export default userForm
