// ! In session we are going to store all the data about the currently logged in 

import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { SessionInterface, UserProfile } from '@/types/index';
import { createUser, createUserWithCred, getUser, getUserWithCred } from './actions';
import CredentialsProvider from 'next-auth/providers/credentials';

const signInProvider = CredentialsProvider({
    credentials: {
        email: {
            label: 'Email',
            type: 'email',
        },
        password: {
            label: 'Password',
            type: 'password',
        }
    },
    async authorize(credentials) {
        if (!credentials) {
            throw new Error('Credentials not provided.');
        }

        const { email, password } = credentials;

        // Retrieve the user from the database based on the email
        const user = await getUserWithCred(email, password);

        if (!user || user.password !== password) {
            throw new Error('Invalid email or password.');
        }

        // Return the user if the password matches
        return user as User;
    }
})

const signUpProvider = CredentialsProvider({
    credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        avatarUrl: { label: 'Avatar URL', type: 'text' },
    },
    async authorize(credentials: Record<"name" | "email" | "password" | "avatarUrl", string> | undefined) {
        try {
            if (!credentials) {
                throw new Error('Credentials not defined.');
            }

            // Check if user already exists
            const existingUser = await getUser(credentials.email as string);

            if (existingUser) {
                throw new Error('User already exists.');
            }

            // Create a new user
            const { name, email, password, avatarUrl } = credentials;
            const user = await createUserWithCred(name as string, email as string, password as string, avatarUrl as string);

            // Return the newly created user
            return user
        } catch (error) {
            console.log(error);
            throw new Error('Error creating user.');
        }
    },
});

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        signInProvider,
        signUpProvider,
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: 'grafbase',
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, secret);
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret);
            return decodedToken as JWT;
        },
    },
    theme: {
        colorScheme: 'light',
        logo: '/hero.png',
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string;

            try {
                const data = await getUser(email) as { user?: UserProfile }
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user,
                    }
                }
                return newSession;
            } catch (error) {
                console.log(`Error retrieving user data`, error);
                return session;
            }
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // get the user if they exist
                const userExists = await getUser(user?.email as string) as { user?: UserProfile };

                // if they don't exist, create a new one
                if (!userExists.user) {
                    await createUser(
                        user.name as string,
                        user.email as string,
                        user.image as string
                    );
                }
                // return the user/ true
                return true;

            } catch (error: any) {
                console.log(error);
                return false;
            }


        },
    }

}

export async function getCurrentUser() {

    const session = await getServerSession(authOptions) as SessionInterface;

    return session;
}

