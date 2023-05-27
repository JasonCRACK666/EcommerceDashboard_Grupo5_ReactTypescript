import * as z from 'zod'

export const createProductValidation = z.object({
  title: z.string().nonempty({ message: 'El título es requerido' }),
  description: z.string().nonempty({ message: 'La descripción es requerida' }),
  originalPrice: z
    .number({
      required_error: 'El precio original es requerido',
      invalid_type_error: 'El precio original es un número'
    })
    .positive({ message: 'Debe ser mayor a 0' })
    .lte(99999.99, { message: 'Máximo 5 dígitos' })
    .multipleOf(0.01, { message: 'Máximo 2 decimales' }),
  discountRate: z
    .number({ invalid_type_error: 'El porcentaje de descuento es un número' })
    .nonnegative({ message: 'No debe ser negativo' })
    .lte(50, { message: 'Máximo 50% de descuento' })
    .int({ message: 'Debe de ser un entero' })
    .optional()
    .or(z.nan()),
  pointValue: z
    .number({
      required_error: 'Los puntos de compra son requeridos',
      invalid_type_error: 'Los puntos de compra son un número'
    })
    .positive({ message: 'Debe ser mayor a 0' }),
  quantity: z
    .number({
      required_error: 'El stock es requerido',
      invalid_type_error: 'El stock es un número'
    })
    .positive({ message: 'Debe ser mayor a 0' }),
  category: z
    .number({ required_error: 'La categoría es requerida' })
    .int({ message: 'Debe de ser un entero' })
    .positive({ message: 'Debe ser mayor a 0' }),
  brand: z
    .number({ required_error: 'La marca es requerida' })
    .int({ message: 'Debe de ser un entero' })
    .positive({ message: 'Debe ser mayor a 0' }),
  colors: z
    .number()
    .positive()
    .array()
    .nonempty({ message: 'Debe de contener mínimo un color' }),
  images: z
    .custom<File>()
    .array()
    .nonempty({ message: 'Debe de contener mínimo una imagen' })
})
