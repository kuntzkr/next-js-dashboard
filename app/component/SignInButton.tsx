"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {

    const { data: session } = useSession();
    
    // Case of active session
    if(session && session.user){
        return(
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.name}</p>
                <button onClick={ () => signOut() } className="text-red-600">
                    Sign Out
                </button>
            </div>
        )
    }

    // Cause of no active session
    return(
        <button onClick={() => signIn()} className="text-green-600 ml-auto">
            Sign In
        </button>
    ) 
}

export default SignInButton