import { z } from 'zod';

export const validateField = (
  schema: z.ZodObject<any>,
  name: string,
  value: string,
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
) => {
  try {
    schema.shape[name as keyof typeof schema.shape].parse(value);
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: e.errors[0]?.message || '',
      }));
    }
    return false;
  }
};

export const validateForm = (
  schema: z.ZodObject<any>,
  data: any,
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        errors[err.path[0].toString()] = err.message;
      }
    });
    setFormErrors(errors);
    return false;
  }
  setFormErrors({});
  return true;
};
