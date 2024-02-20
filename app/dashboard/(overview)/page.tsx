'use-client';

import { lusitana } from '@/app/ui/fonts';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
 
export default async function DashboardPage() {  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}