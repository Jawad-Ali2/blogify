'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import CustomButton from './CustomButton';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | undefined;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);


    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();

            setProviders(res);
        }

        fetchProviders();
    }, []);

    if (providers) {
        return (
            <div className='flex gap-4'>
                {Object.values(providers).map((provider: Provider, i) => (
                    // <button key={i} onClick={() => signIn(provider?.id)}>
                    //     {provider.id}
                    // </button>
                    <CustomButton
                        key={i}
                        handleClick={() => signIn(provider?.id)}
                        title="Get Started"
                        containerStyles="hover:outline-[#f7a36c] outline outline-1 outline-primary"
                    />
                )
                )}
            </div>
        )
    }
}

export default AuthProviders;
