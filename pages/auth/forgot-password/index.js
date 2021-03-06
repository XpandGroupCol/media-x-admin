
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import Input from 'components/input'

import styles from '../auth.module.css'

import ControllerField from 'components/ControllerField'
import Link from 'next/link'

import * as yup from 'yup'
import useForgotpassword from 'hooks/useForgotpassword'

const defaultValues = {
  email: ''
}

const schema = yup.object({
  email: yup.string()
    .email('Ingrese un correo valido.')
    .required('El correo electronico es requerido')
}).required()

export default function ForgotPassword () {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { forgot, loading } = useForgotpassword()

  return (
    <div className={styles.login}>
      <div className={styles.containerForm}>
        <form onSubmit={handleSubmit(forgot)}>
          <h3 className={styles.title}>Recuperar contraseña</h3>
          <h2 className={styles.subtitle} align='center'>Hola, recupera tu contraseña</h2>
          <section className={styles.fields}>
            <ControllerField
              name='email'
              label='Correo electronico'
              control={control}
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

export async function getStaticProps (context) {
  return {
    props: {
      protected: true
    }
  }
}
