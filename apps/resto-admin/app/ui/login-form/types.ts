import { LoginSchema } from '@/lib/schemas';
import type { z } from 'zod';

export type LoginValues = z.infer<typeof LoginSchema>;

export const ServerErrorMSG = {
  credentialsError: 'Password does not match with your account',
  validationError: 'fields not filled correctly',
  authError:
    "We've experienced an error during your authentication, please try again",
} as const;

export const InputErrorMSG = {
  emailError: 'Invalid e-mail',
  passwordMinLenght: 'Be at least 8 characters long',
  passwordHasLetter: 'Contain at least one letter',
  passwordHasNumber: 'Contain at least one number',
} as const;
