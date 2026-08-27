'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageComponent({
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { src, alt, width, height } = props;

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400',
          className,
        )}
      >
        <ImageIcon size={32} />
      </div>
    );
  }

  return (
    <div className={cn('relative h-10 w-10', className)}>
      {isLoading && <Skeleton className={cn('h-10 w-10 rounded', className)} />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded object-cover h-full transition-opacity duration-300  ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
