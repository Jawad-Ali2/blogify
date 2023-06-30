import { createUserMutation, getUserQuery } from "@/garphql";
import bcrypt from 'bcrypt';
import { UserProfile } from "@/types";
import { GraphQLClient } from "graphql-request";

interface UserData {
    user?: UserProfile;
    // Other fields...
}

interface CreateUserResponse {
    createUserWithCred: {
        user: UserProfile;
    }
}

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '1234';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl as string, {
    headers: {
        'x-api-key': process.env.apiKey as string,
    }
});

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        // client request
        return await client.request(query, variables);

    } catch (error) {
        throw error;
    }

}

// ! For login/sign up with credentials


export const getUserWithCred = async (email: string, password: string) => {
    client.setHeader('x-api-key', apiKey);


    const userData = await makeGraphQLRequest(getUserQuery, { email }) as UserData;
    const user = userData?.user;
    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            return user as UserProfile | undefined;
        }
    }
    return undefined;

};

export const createUserWithCred = async (name: string, email: string, password: string, avatarUrl: string) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a cost factor of 10
    const input = {
        name,
        email,
        password: hashedPassword, // Store the hash password
        avatarUrl,
    };

    const response = await makeGraphQLRequest(createUserMutation, { input }) as CreateUserResponse;
    return response.createUserWithCred.user;
};

// ! For login with google

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email })

}
export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name: name,
            email: email,
            avatarUrl: avatarUrl
        }
    }

    return makeGraphQLRequest(createUserMutation, variables)
}
