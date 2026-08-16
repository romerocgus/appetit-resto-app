import { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TableImage({
  src,
}: {
  src: string | null | undefined;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
        <ImageIcon size={32} />
      </div>
    );
  }

  return (
    <div className="relative h-10 w-10">
      {isLoading && <Skeleton className="h-10 w-10 rounded" />}
      <Image
        src={src}
        alt="product image"
        width={40}
        height={40}
        className={`rounded object-cover h-full transition-opacity duration-300  ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
