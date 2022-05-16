
import * as yup from 'yup'

export const defaultValues = {
  password: ''
}

export const schema = yup.object({
  password: yup.string().required('Contraseña es requerida')
}).required()
