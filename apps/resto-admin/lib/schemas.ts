import { InputErrorMSG } from '@/app/ui/login-form/types';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email(InputErrorMSG.emailError).trim(),
  password: z
    .string()
    .min(8, { error: InputErrorMSG.passwordMinLenght })
    .regex(/[a-zA-Z]/, { error: InputErrorMSG.passwordHasLetter })
    .regex(/[0-9]/, { error: InputErrorMSG.passwordHasNumber })
    .trim(),
});
