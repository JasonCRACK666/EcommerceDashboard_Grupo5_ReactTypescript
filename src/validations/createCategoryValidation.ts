import * as z from 'zod'

export const createCategoryValidation = z.object({
  name: z
    .string({ required_error: 'El nombre de la categoría es requerida' })
    .min(3, { message: 'Mínimo 3 caracteres' })
})
