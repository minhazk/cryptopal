import React, { useEffect, useState } from 'react';
import { RxGear } from 'react-icons/rx';
import { BiSortAlt2 } from 'react-icons/bi';
import ThreadCard from '../../components/ThreadCard';
import { Link } from 'react-router-dom';
import TagList from '../../components/TagList';
import TagPicker from '../../components/TagPicker';

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
    const [isEditingTags, setIsEditingTags] = useState(false);

    useEffect(() => {
        setThreads(threads.filter(thread => thread.tags.some(tag => tags.some(t => t.id === tag.id))));
    }, [tags]);

    return (
        <div className='mt-5'>
            <div className='flex items-center gap-10 justify-between'>
                <div className='flex-wrap items-center flex gap-2'>
                    <span className='text-sm text-primary font-semibold'>Tags</span>
                    <TagList tags={tags} />
                    <button onClick={() => setIsEditingTags(prev => !prev)}>
                        <RxGear color='gray' />
                    </button>
                    {isEditingTags && <TagPicker tags={tags} setTags={setTags} closePopup={() => setIsEditingTags(false)} />}
                </div>
                <div className=''>
                    <button className='flex items-center gap-1 px-2'>
                        <BiSortAlt2 color='gray' size={18} />
                        <p className='text-xs text-gray-400'>Sort</p>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-4 py-2'>
                {threads.map(thread => (
                    <Link key={thread.id} to={`/thread/${thread.id}`}>
                        <ThreadCard key={thread.id} {...thread} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ThreadList;
