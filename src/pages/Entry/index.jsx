import React, { useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';
import ThreadCard from '../../components/ThreadCard';
import SignInForm from './SignInForm';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Entry = () => {
    const { user } = useUserContext();
    const [signingUp, setSigningUp] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) navigate('/home');
    }, [user]);

    const dummyCards = [
        {
            id: 1,
            tags: [
                { id: 4123, label: 'Ethereum', color: '#FF7979' },
                { id: 2213, label: 'dApps', color: '#28A1C7' },
            ],
            title: 'What Are the Best dApps Built on Ethereum?',
            body: "Hey everyone, I'm a big fan of Ethereum and I'm interested in exploring some of the best decentralized applications (dApps) built on the platform. I know there are a lot of different dApps out there, so I'm wondering if anyone has any recommendations for the best ones to check out. Thanks in advance for your suggestions!",
            author: 'CryptoFanatic21',
            timestamp: Date.now(),
            gold: 31,
            silver: 54,
            bronze: 82,
        },
        {
            id: 2,
            tags: [
                { id: 1123, label: 'Bitcoin', color: '#C339BE' },
                { id: 1123, label: 'Fees', color: '#21eb72' },
                { id: 1123, label: 'Exchanges', color: '#4e86f5' },
            ],
            title: 'Is Dogecoin a Good Investment in 2023?',
            body: "I've been following Dogecoin for a while now and I'm wondering if it's worth investing in for the long term. I know it started as a joke, but it's been gaining a lot of popularity and attention lately. What do you all think? Is Dogecoin a good investment in 2023?",
            author: 'DogeDude',
            timestamp: Date.now(),
            gold: 42,
            silver: 33,
            bronze: 116,
        },
        {
            id: 3,
            tags: [
                { id: 3123, label: 'Dogecoin', color: '#775BE9' },
                { id: 3123, label: 'Investment', color: '#E35BE9' },
                { id: 3123, label: 'Long Term', color: '#973EE9' },
            ],
            title: 'How to Buy Bitcoin Without Paying High Fees',
            body: "Hey fellow Bitcoin enthusiasts, I've been using a few different exchanges to buy and sell Bitcoin, but I'm tired of paying such high fees. Does anyone have any tips or recommendations for buying Bitcoin without paying a fortune in fees? Thanks in advance for your help!",
            author: 'BitcoinBozo',
            timestamp: Date.now(),
            gold: 22,
            silver: 47,
            bronze: 92,
        },
    ];

    return (
        <div className='flex'>
            <h1 className='absolute top-7 left-1/2 -translate-x-1/2 md:left-14 md:translate-x-0 text-xl font-extrabold text-primary md:text-white tracking-wide'>CRYPTOPAL</h1>
            <div className='py-20 min-h-screen bg-primary w-full hidden md:flex items-center px-2 lg:px-4'>
                <div className='relative'>
                    <div className='w-[85%] lg:w-[65%] ml-12'>
                        <ThreadCard {...dummyCards[0]} disabled />
                    </div>
                    <div className='mx-auto rounded border my-2 w-[90%] lg:w-[70%]'>
                        <ThreadCard {...dummyCards[1]} disabled />
                    </div>
                    <div className='w-[85%] lg:w-[65%] ml-12'>
                        <ThreadCard {...dummyCards[2]} disabled />
                    </div>
                </div>
            </div>
            <div className='w-full md:max-w-[60%] lg:max-w-[45%]'>{signingUp ? <SignUpForm setSigningUp={setSigningUp} /> : <SignInForm setSigningUp={setSigningUp} />}</div>
        </div>
    );
};

export default Entry;
