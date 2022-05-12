
import * as yup from 'yup'

export const defaultValues = {
  name: '',
  category: []
}

export const schema = yup.object({
  category: yup.array().required('Categoria es requerido').min(1, 'Categoria es requerido'),
  name: yup.string().required('Nombre es requerido')
}).required()
