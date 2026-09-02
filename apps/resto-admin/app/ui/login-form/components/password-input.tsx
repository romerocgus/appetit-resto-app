'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { CircleAlert, Eye, EyeClosed, LockKeyhole } from 'lucide-react';
import * as React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { InputErrorMSG } from '../types';

type PasswordInputProps = {
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
  watch: UseFormWatch<{
    email: string;
    password: string;
  }>;
  showHelper: boolean;
  placeholder: string;
};

export default function PasswordInput({
  register,
  watch,
  showHelper,
  placeholder,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const password = watch('password') || '';

  const validations = {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
  return (
    <>
      <InputGroup>
        <InputGroupAddon>
          <LockKeyhole />
        </InputGroupAddon>
        <InputGroupInput
          id="password"
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          required
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
            <span className="sr-only">
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {showHelper && (
        <div className="px-4">
          <p className="text-xs">Password must:</p>
          <ul>
            <li
              className={cn(
                'flex gap-1 items-center text-xs',
                validations.minLength ? 'text-emerald-700' : 'text-destructive',
              )}
            >
              <CircleAlert size={14} />
              <span>{InputErrorMSG.passwordMinLenght}</span>
            </li>
            <li
              className={cn(
                'flex gap-1 items-center text-xs',
                validations.hasLetter ? 'text-emerald-700' : 'text-destructive',
              )}
            >
              <CircleAlert size={14} />
              <span>{InputErrorMSG.passwordHasLetter}</span>
            </li>
            <li
              className={cn(
                'flex gap-1 items-center text-xs',
                validations.hasNumber ? 'text-emerald-700' : 'text-destructive',
              )}
            >
              <CircleAlert size={14} />
              <span>{InputErrorMSG.passwordHasNumber}</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
