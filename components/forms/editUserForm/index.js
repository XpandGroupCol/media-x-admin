import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import useMutateHandler from 'hooks/useMutateHandler'

import Typography from 'components/typography'
import { useLists } from 'providers/listProvider'

import styles from '../form.module.css'
import Link from 'next/link'
import { defaultValues, schema } from './schema'
import PhoneInput from 'components/phoneInput'
import Checkbox from 'components/checkbox'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Avatar } from '@mui/material'

const CreateUserForm = ({ user = defaultValues }) => {
  const { formState: { errors }, handleSubmit, control, setValue } = useForm({
    defaultValues: { ...user },
    resolver: yupResolver(schema)
  })

  const { loading, mutateHandler } = useMutateHandler()

  const { roles = [] } = useLists()

  const onSubmit = ({ phone = '', phonePrefixed = '', role, id, fullName, ...user }) => {
    const body = {
      ...user,
      phone: phone,
      phonePrefixed,
      role: role?.id
    }

    mutateHandler({ path: `/users/${id}`, method: 'PUT', body })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={styles.title} align='center'>Nuevo usuario</Typography>
      <div className={styles.avatar}>
        <Avatar src={user?.avatar} sx={{ width: 90, height: 90 }} />
      </div>

      <ControllerField
        name='name'
        label='Nombres'
        control={control}
        element={Input}
        error={Boolean(errors?.name?.message)}
        helperText={errors?.name?.message}
        disabled
      />
      <ControllerField
        name='lastName'
        label='Apellidos'
        control={control}
        element={Input}
        error={Boolean(errors?.lastName?.message)}
        helperText={errors?.lastName?.message}
        disabled
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
          disabled
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
              max: 100, min: 1, step: '0.25'
            }
          }}
        />
      </div>
      <div className={styles.rut}>
        {user?.rut
          ? (
            <a href={`${user?.rut}`} target='blank' className={styles.showRut}>
              <VisibilityIcon fontSize='small' />
              Ver rut
            </a>)
          : <span>No hay documento</span>}
        <ControllerField
          name='checkRut'
          label='Validar el rut'
          control={control}
          element={Checkbox}
          size='small'
          disabled={!user?.rut}
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
