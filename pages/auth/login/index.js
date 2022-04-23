
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import Input from 'components/input'

import styles from './login.module.css'
import useSignIn from 'hooks/useSignIn'

import ControllerField from 'components/ControllerField'
import Link from 'next/link'

import * as yup from 'yup'

export const defaultValues = {
  email: '',
  password: ''
}

export const schema = yup.object({
  password: yup.string().required('Contraseña es requerido').min(8, 'Contraseña debe tener minimo 8 caracteres').max(15, 'Contraseña debe tener maximo 15 caracteres'),
  email: yup.string().email('Ingrese un correo valido').required('Correo electronico es requerido')
}).required()

export default function SignIn () {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { loginCrendentials, loading } = useSignIn()

  return (
    <div className={styles.login}>
      <div className={styles.containerForm}>
        <form onSubmit={handleSubmit(loginCrendentials)}>
          <h3 className={styles.title}>iniciar sesión</h3>
          <section className={styles.fields}>
            <ControllerField
              name='email'
              label='Correo electronico'
              control={control}
              element={Input}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
            <ControllerField
              name='password'
              label='Contraseña'
              control={control}
              element={Input}
              type='password'
              error={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message}
            />
          </section>
          <Link href='/forgot-password'>
            <a className={styles.forgotPassword}>
              Recuperar contraseña
            </a>
          </Link>
          <Button
            color='primary'
            type='submit'
            loading={loading}
            size='large'
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  )
}

SignIn.publicPage = true
