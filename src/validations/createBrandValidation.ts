import * as z from 'zod'

export const createBrandValidation = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' }),
  logo: z.custom<File>(value => (value as File).size, {
    message: 'El logo es requerido'
  }),
  banner: z.custom<File>(value => (value as File).size, {
    message: 'El banner es requerido'
  })
})
