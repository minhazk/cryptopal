import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import ThreadCard from '../../components/ui/ThreadCard';
import SignInForm from './SignInForm';

const Entry = () => {
    const [signingUp, setSigningUp] = useState(true);
    const dummyCards = [
        {
            id: 12321312,
            tags: [
                { id: 4123, label: 'BTC', color: '#FF7979' },
                { id: 2213, label: 'ETH', color: '#28A1C7' },
            ],
            title: 'Thread title',
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
            author: 'John Doe',
            timestamp: Date.now(),
            gold: 2,
            silver: 7,
            bronze: 11,
        },
        {
            id: 2312312,
            tags: [{ id: 1123, label: 'ADA', color: '#C339BE' }],
            title: 'Thread title',
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
            author: 'Minhaz',
            timestamp: Date.now(),
            gold: 2,
            silver: 7,
            bronze: 11,
        },
        {
            id: 31241232,
            tags: [{ id: 3123, label: 'USDT', color: '#775BE9' }],
            title: 'Thread title',
            body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
            author: 'Dave',
            timestamp: Date.now(),
            gold: 2,
            silver: 7,
            bronze: 11,
        },
    ];

    return (
        <div className='flex'>
            <h1 className='absolute top-7 left-1/2 -translate-x-1/2 md:left-14 md:translate-x-0 text-xl font-extrabold text-primary md:text-white tracking-wide'>CRYPTOPAL</h1>
            <div className='min-h-screen bg-primary w-full hidden md:flex items-center px-2 lg:px-4'>
                <div className='relative'>
                    <div className='w-[85%] lg:w-[65%] ml-12'>
                        <ThreadCard {...dummyCards[0]} />
                    </div>
                    <div className='mx-auto rounded border my-2 w-[90%] lg:w-[70%]'>
                        <ThreadCard {...dummyCards[1]} />
                    </div>
                    <div className='w-[85%] lg:w-[65%] ml-12'>
                        <ThreadCard {...dummyCards[2]} />
                    </div>
                </div>
            </div>
            <div className='w-full md:max-w-[60%] lg:max-w-[45%]'>{signingUp ? <SignUpForm setSigningUp={setSigningUp} /> : <SignInForm setSigningUp={setSigningUp} />}</div>
        </div>
    );
};

export default Entry;
