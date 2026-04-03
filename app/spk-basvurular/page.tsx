'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SPKBasvurularPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/halka-arz');
  }, [router]);

  return (
    <div className="flex items-center justify-center py-20">
      <p style={{ color: 'var(--text-muted)' }}>Yönlendiriliyor...</p>
    </div>
  );
}
