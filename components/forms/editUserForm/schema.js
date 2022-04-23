
import * as yup from 'yup'

export const defaultValues = {
  status: null,
  role: null
}

export const schema = yup.object({
  status: yup.object().required().nullable(),
  role: yup.object().required().nullable()
}).required()
