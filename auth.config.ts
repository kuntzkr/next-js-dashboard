import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      
      // Get user logged-in & page status
      const isLoggedIn = !!auth?.user;
      const isOnSecureRoute = nextUrl.pathname.startsWith('/dashboard');
      
      // Case of user on a secure route - return login status
      if (isOnSecureRoute) {
        return isLoggedIn;
      } 
      
      else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Case of unauth'd user hitting public route
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  secret: process.env.SECRET,
  session: { strategy: "jwt" }, 
} satisfies NextAuthConfig;