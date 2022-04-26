
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import useSignIn from 'hooks/useSignIn'

import { defaultValues, schema } from 'schemas/auth.schema'
import styles from '../auth.module.css'

export default function SignIn () {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { loginCrendentials, loading } = useSignIn()

  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSubmit(loginCrendentials)}>
        <h3 className={styles.title} align='center'>MEDIAX Admin</h3>
        <h2 className={styles.subtitle} align='center'>Hola, Bienveniendo</h2>
        <section className={styles.fields}>
          <ControllerField
            name='email'
            label='Correo electrónico'
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
        <div className={styles.forgotPassword}>
          <Link href='/auth/forgot-password'>
            <a>
              Recuperar contraseña?
            </a>
          </Link>
        </div>
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
  )
}

export async function getStaticProps (context) {
  return {
    props: {
      protected: true
    }
  }
}
