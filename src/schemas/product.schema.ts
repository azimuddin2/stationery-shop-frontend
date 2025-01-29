import { z } from 'zod';

export const productSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  brand: z.string({
    required_error: 'Brand is required',
  }),
  price: z.string({
    required_error: 'Price is required',
  }),
  category: z.string({
    required_error: 'Category is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  quantity: z.string({
    required_error: 'quantity is required',
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .refine(
      (file) =>
        ['image/png', 'image/jpeg', 'application/pdf'].includes(file.type),
      {
        message: 'Only PNG, JPEG, and PDF files are allowed',
      },
    ),
});
