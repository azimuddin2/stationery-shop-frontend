import { z } from 'zod';

export const reviewSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  location: z.string({
    required_error: 'Please select your country',
  }),
  description: z.string({
    required_error: 'Your feedback is required',
  }),
});
