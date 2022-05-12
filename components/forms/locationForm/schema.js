
import * as yup from 'yup'

export const defaultValues = {
  name: '',
  country: null
}

export const schema = yup.object({
  country: yup.object().required('Pais es requerido').nullable(),
  name: yup.string().required('Nombre es requerido')
}).required()
