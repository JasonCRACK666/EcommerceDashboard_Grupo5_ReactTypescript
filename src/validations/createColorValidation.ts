import * as z from 'zod'

export const createColorValidation = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(3, { message: 'Mínimo 3 caracteres' }),
  hex: z
    .string({
      required_error: 'El código del color (hexadecimal) es requerido'
    })
    .regex(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, {
      message:
        'El código es invalido, no cumple con la estructura de un hexadecimal'
    })
    .max(7, { message: 'Máximo 7 caracteres' })
})
