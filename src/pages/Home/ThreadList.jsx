import React, { useState } from 'react';
import Tag from '../../components/ui/Tag';
import { RxGear } from 'react-icons/rx';
import { BiSortAlt2 } from 'react-icons/bi';
import ThreadCard from '../../components/ThreadCard';
import { Link } from 'react-router-dom';

const ThreadList = () => {
    const dummyTags = [
        { id: 1123, label: 'ADA', color: '#C339BE' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
        { id: 3123, label: 'USDT', color: '#775BE9' },
        { id: 4123, label: 'BTC', color: '#FF7979' },
    ];
    const dummyThreads = [
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
    const [tags, setTags] = useState(dummyTags);
    const [threads, setThreads] = useState(dummyThreads);

    return (
        <div className='mt-5'>
            <div className='flex items-center gap-10'>
                <div className='overflow-x-auto flex gap-2'>
                    {tags.map(tag => (
                        <Tag key={tag.id} {...tag} />
                    ))}
                    <button>
                        <RxGear color='gray' />
                    </button>
                </div>
                <div className='ml-auto'>
                    <button className='flex items-center gap-1 px-2'>
                        <BiSortAlt2 color='gray' size={18} />
                        <p className='text-xs text-gray-400'>Sort</p>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-4 py-2'>
                {threads.map(thread => (
                    <Link to={`/thread/${thread.id}`}>
                        <ThreadCard key={thread.id} {...thread} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ThreadList;
