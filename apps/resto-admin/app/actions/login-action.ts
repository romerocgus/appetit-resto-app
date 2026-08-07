'use server';

import { signIn } from '@/auth';
import { LoginSchema } from '@/lib/schemas';
import { AuthError } from 'next-auth';
import { LoginValues, ServerErrorMSG } from '../ui/login-form/types';

export async function loginAction(formValues: LoginValues) {
  const validatedFields = LoginSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      error: ServerErrorMSG.validationError,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            error: ServerErrorMSG.credentialsError,
          };
        }

        default: {
          return { error: ServerErrorMSG.authError };
        }
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}
