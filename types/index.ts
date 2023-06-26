import { MouseEventHandler } from 'react';
import { User, Session } from 'next-auth'

export interface CustomButtonProps {
    type?: 'button' | 'submit';
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ProfileMenuProps extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    }
}
export interface PostInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    category: string;
    id: string;
    createdBy: {
        name: string;
        email: string;
        avatarUrl: string;
        id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    post: {
        edges: { node: PostInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
}

export interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}