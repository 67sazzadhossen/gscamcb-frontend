'use client';
import Image from 'next/image';
import { useState } from 'react';
export default function UserAvatar({
  name,
  src,
}: {
  name: string;
  src?: string | null;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const parts = name.trim().split(/\s+/);
  const initials = [
    parts[0]?.[0],
    parts.length > 1 ? parts.at(-1)?.[0] : undefined,
  ]
    .filter(Boolean)
    .join('')
    .toUpperCase();
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-school-yellow text-sm font-extrabold text-blue-950 ring-2 ring-white/20">
      {src && src !== failedSrc ? (
        <Image
          src={src}
          alt={`${name}'s profile image`}
          width={48}
          height={48}
          unoptimized
          className="h-full w-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span role="img" aria-label={`${name}'s avatar`}>
          {initials || '?'}
        </span>
      )}
    </span>
  );
}
