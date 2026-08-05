'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Eye, EyeClosed, LockKeyhole } from 'lucide-react';
import * as React from 'react';

export default function PasswordInput() {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <InputGroup>
      <InputGroupAddon>
        <LockKeyhole />
      </InputGroupAddon>
      <InputGroupInput
        id="password"
        name="password"
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
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
  );
}
