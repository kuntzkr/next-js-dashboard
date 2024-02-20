import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""            
        })
    ], 
    callbacks: {
        async jwt({ token, account }: any) {
            if (account) {
                // Set session JWT for internal API
                const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: {
                        Authorization: `Bearer ${account.access_token}`,
                    },
                });
                const userInfo = await response.json();                
                console.log("UserInfo: " + JSON.stringify(userInfo, null, 2));

                token.accessToken = account.access_token;
            }
            // console.log("Token: " + token.accessToken)
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.accessToken = token.accessToken as string
            session.user.id = token.id as number
            
            return session
        },
    }
})

export{ handler as GET, handler as POST };