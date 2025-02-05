import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export const registerFormSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export const updateUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .optional(),
  address: z
    .string({
      required_error: 'Address is required',
    })
    .optional(),
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
    )
    .optional(),
});
