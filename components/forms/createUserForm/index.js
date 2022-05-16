import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import useMutateHandler from 'hooks/useMutateHandler'

import UploadFile from 'components/uploadFile'
import Typography from 'components/typography'
import { useLists } from 'providers/listProvider'

import styles from '../form.module.css'
import Link from 'next/link'
import { defaultValues, schema } from './schema'
import PhoneInput from 'components/phoneInput'
import Checkbox from 'components/checkbox'
import InputFile from 'components/inputFile'
import { useRouter } from 'next/router'

const CreateUserForm = () => {
  const { formState: { errors }, handleSubmit, control, setValue } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { loading, mutateWithImage } = useMutateHandler()

  const { replace } = useRouter()

  const { roles = [] } = useLists()

  const onSubmit = ({ role, ...user }) => {
    const payload = {
      ...user,
      role: role?.id
    }

    const body = new window.FormData()

    Object.entries(payload).forEach(([key, value]) => {
      body.append(key, value ?? '')
    })

    mutateWithImage({ path: '/users', method: 'POST', body })
      .then((values) => {
        if (values) {
          replace('/users')
        }
      })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={styles.title} align='center'>Nuevo usuario</Typography>
      <ControllerField
        name='avatar'
        label='Subir avatar'
        control={control}
        element={UploadFile}
        id='upload-avatar'
      />

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
      <div className={styles.inputGroups}>
        <ControllerField
          name='email'
          label='Correo electronico'
          control={control}
          type='email'
          element={Input}
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
        />

      </div>
      <div className={styles.inputGroups}>
        <ControllerField
          name='role'
          label='Rol'
          control={control}
          element={Autocomplete}
          options={roles}
          error={Boolean(errors?.role?.message)}
          helperText={errors?.role?.message}
        />
        <ControllerField
          name='password'
          label='Contraseña'
          type='password'
          control={control}
          element={Input}
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
        />
      </div>
      <span className={styles.divider} />
      <Typography className={styles.subtitle} align='left'>Perfil de empresa</Typography>
      <ControllerField
        name='company'
        label='Empresa'
        control={control}
        element={Input}
        error={Boolean(errors?.company?.message)}
        helperText={errors?.company?.message}
      />
      <div className={styles.inputGroups}>
        <ControllerField
          name='nit'
          label='Nit'
          control={control}
          element={Input}
          error={Boolean(errors?.nit?.message)}
          helperText={errors?.nit?.message}
        />
        <ControllerField
          name='address'
          label='Dirección'
          control={control}
          element={Input}
          error={Boolean(errors?.address?.message)}
          helperText={errors?.address?.message}
        />
      </div>
      <div className={styles.inputGroups}>
        <ControllerField
          name='companyEmail'
          label='Correo electronico empresa'
          type='email'
          control={control}
          element={Input}
          error={Boolean(errors?.companyEmail?.message)}
          helperText={errors?.companyEmail?.message}
        />
      </div>
      <div className={styles.inputGroups}>
        <ControllerField
          name='phone'
          label='Telefono'
          control={control}
          element={PhoneInput}
          onChange={({ phone, dialCode }) => {
            setValue('phone', phone, { shouldValidate: true })
            setValue('phonePrefixed', dialCode, { shouldValidate: true })
          }}
          error={Boolean(errors?.phone?.message)}
          helperText={errors?.phone?.message}
        />
        <ControllerField
          name='percentage'
          label='Porcentaje de comision'
          control={control}
          element={Input}
          type='number'
          error={Boolean(errors?.percentage?.message)}
          helperText={errors?.percentage?.message}
          InputProps={{
            inputProps: {
              max: 100, min: 10, step: '0.25'
            }
          }}
        />
      </div>
      <div className={styles.rut}>

        <ControllerField
          name='rut'
          label='Subir rut'
          control={control}
          element={InputFile}
          id='upload-rut'
        />

        <ControllerField
          name='checkRut'
          label='Validar el rut'
          control={control}
          element={Checkbox}
          size='small'
        />
      </div>
      <div className={styles.buttons}>
        <Link href='/users'>
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

export default CreateUserForm
