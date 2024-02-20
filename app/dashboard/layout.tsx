'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  
    // Case of unatuh'd user accessing secure route
    useEffect(() => {
      const checkLogin = async () => {
        const session = await getSession();
        console.log("Access Token: " + session?.user.accessToken);
        if (!session?.user.accessToken) {
          window.location.href = 'http://localhost:3000';
        }
      };
  
      checkLogin();
    }, []);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}