import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
});

export const updateUserSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
