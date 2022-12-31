import React, { useEffect, useState } from 'react';
import { RxGear } from 'react-icons/rx';
import { BiSortAlt2 } from 'react-icons/bi';
import ThreadCard from '../../components/ThreadCard';
import { Link } from 'react-router-dom';
import TagList from '../../components/TagList';
import TagPicker from '../../components/TagPicker';
import { useThreadContext } from '../../context/ThreadContext';

const ThreadList = () => {
    const { allThreads } = useThreadContext();
    console.log(allThreads);
    const [tags, setTags] = useState([]);
    const [isEditingTags, setIsEditingTags] = useState(false);

    // useEffect(() => {
    //     if (tags.length === 0) {
    //         setThreads(allThreads);
    //     } else {
    //         setThreads(threads.filter(thread => thread.tags.some(tag => tags.some(t => t.id === tag.id))));
    //     }
    // }, [tags]);

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
                {allThreads.map(thread => (
                    <Link key={thread.id} to={`/thread/${thread.id}`}>
                        <ThreadCard key={thread.id} {...thread} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ThreadList;
