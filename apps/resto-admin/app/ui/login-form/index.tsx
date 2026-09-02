'use client';

import { loginAction } from '@/app/actions/login-action';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { LoginSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from './components/password-input';
import { LoginValues } from './types';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const t = useTranslations('LoginPage');

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (values: LoginValues) => {
    setServerError(undefined);
    const result = await loginAction(values);

    if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="p-6 md:p-8"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src="/assets/images/appetit-logo.svg"
                  alt="appetit logo"
                  width={64}
                  height={64}
                />
                <h1 className="text-2xl font-bold">{t('title')}</h1>
                <p className="text-balance text-muted-foreground">
                  {t('subtitle')}
                </p>
              </div>
              <Field>
                <InputGroup>
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    {...register('email')}
                    required
                  />
                </InputGroup>
                {errors.email?.message && (
                  <p className="text-destructive text-xs px-4">
                    {errors.email?.message}
                  </p>
                )}
              </Field>
              <Field>
                {/* TODO: REMOVE PASSWORD FROM UI */}
                <p className="text-balance text-muted-foreground">
                  password123
                </p>
                <PasswordInput
                  register={register}
                  showHelper={!!errors.password?.message}
                  watch={watch}
                  placeholder={t('passwordInput')}
                />
                {/* TODO: Create a page for this case */}
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  {t('noPassword')}
                </a>
              </Field>
              <Field>
                <Button type="submit">{t('loginButton')}</Button>
                {serverError && (
                  <p className="text-destructive text-xs text-center">
                    {serverError}
                  </p>
                )}
              </Field>
              <FieldSeparator>{t('separatorText')}</FieldSeparator>
              {/* TODO: GOOGLE LOGIN */}
              <Button variant="outline" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only">{t('googleButton')}</span>
              </Button>
              <FieldDescription className="text-center">
                {/* TODO: CREATE REGISTER PAGE */}
                {t('signupText')} <a href="#">{t('signupLink')}</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              width={500}
              height={500}
              src="/assets/images/login-image.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* TODO: CREATE TERMS OF SERVICE AND PRIVACY POLICY PAGES */}
      <FieldDescription className="px-6 text-center">
        {t('termsPart1')}
        <a href="#">{t('termsPart2')}</a>
        {t('termsPart3')}
        <a href="#">{t('termsPart4')}</a>.
      </FieldDescription>
    </div>
  );
}
