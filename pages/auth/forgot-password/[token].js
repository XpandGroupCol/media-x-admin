
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import Input from 'components/input'

import styles from '../auth.module.css'
import useSignIn from 'hooks/useSignIn'

import ControllerField from 'components/ControllerField'
import Link from 'next/link'

import * as yup from 'yup'
import useChangePassword from 'hooks/useChangePassword'
import { Router, useRouter } from 'next/router'
import { verifyForgotPassword } from 'services/auth'

const defaultValues = {
  password: ''
}

const schema = yup.object({
  password: yup.string().required('La contraseña es requerida.')
    .min(8, 'Contraseña debe tener minimo 8 caracteres')
    .max(15, 'Contraseña debe tener maximo 15 caracteres')
}).required()

export default function ForgotPassword ({ success, token }) {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const router = useRouter()

  const { updatePassword, loading } = useChangePassword()

  if (!success) return <p>El link ha expirado.</p>

  const handleChangePassword = ({ password }) => {
    updatePassword({ password, token }, true).then(response => response && router.replace('/auth/login'))
  }

  return (
    <div className={styles.login}>
      <div className={styles.containerForm}>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <h3 className={styles.title}>Recuperar contraseña</h3>
          <h2 className={styles.subtitle} align='center'>Hola, ingrese la nueva contraseña</h2>
          <section className={styles.fields}>
            <ControllerField
              name='password'
              label='Nueva contraseña'
              control={control}
              type='password'
              element={Input}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
          </section>
          <div className={styles.forgotPassword}>
            <Link href='/auth/login'>
              <a>
                Iniciar sesion
              </a>
            </Link>
          </div>
          <Button
            color='primary'
            type='submit'
            loading={loading}
            size='large'
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps ({ query }) {
  if (!query.token) {
    return {
      redirect: {
        destination: '/auth/forgot-password',
        permanent: false
      }
    }
  }

  let success = false

  try {
    await verifyForgotPassword(query.token)
    success = true
  } catch (e) {
    success = false
  }

  return {
    props: {
      protected: true,
      success,
      token: query.token
    }
  }
}
