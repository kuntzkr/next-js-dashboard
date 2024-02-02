'use client';

import { useState, useEffect } from 'react';
import { fetchSeasons } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

interface Season {
  seasonId: number;
  name: string;
}

export default function Page() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    async function getSeasons() {
      const data = await fetchSeasons();
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
