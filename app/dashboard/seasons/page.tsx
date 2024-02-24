'use client';

import { useState, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { getSession } from 'next-auth/react';

interface Season {
  seasonId: number;
  name: string;
}

export default function Page() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    async function getSeasons() {
      const session = await getSession();
      const data = await fetchSeasons(session);
      setSeasons(data);
    }
    getSeasons();
  }, []);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {seasons.map((season) => (
          <div key={season.seasonId}>
            <h2>{season.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function fetchSeasons(sessionData: any) {
  console.log(sessionData);

  console.log('Fetching seasons data...');
  console.log(`With JWT: ${sessionData?.user?.jwt}`)
  const response = await fetch('https://localhost:44367/seasons', {
    headers: {
      Authorization: `Bearer ${sessionData?.user?.jwt}`,
    },
  });
  const data = await response.json();
  console.log('Seasons data:', data);
  return data;
}
