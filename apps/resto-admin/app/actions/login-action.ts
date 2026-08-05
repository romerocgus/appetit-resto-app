'use server';

import { signIn } from '@/auth';
import { LoginSchema, LoginState } from '@/lib/schemas';
import { AuthError } from 'next-auth';

export async function loginAction(prevState: LoginState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          console.log('credenciales incorrectas');
          return { error: 'Credenciales incorrectas.' };
        }

        default: {
          console.log('Algo salió mal al intentar acceder.');
          return { error: 'Algo salió mal al intentar acceder.' };
        }
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}
