
import * as yup from 'yup'

export const defaultValues = {
  name: ''
}

export const schema = yup.object({
  name: yup.string().required('Nombre de lista es requerido')
}).required()
