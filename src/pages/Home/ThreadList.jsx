import React, { useEffect, useState } from 'react';
import { RxGear } from 'react-icons/rx';
import ThreadCard from '../../components/ThreadCard';
import { useNavigate } from 'react-router-dom';
import TagList from '../../components/TagList';
import TagPicker from '../../components/TagPicker';
import SkeletonList from './SkeletonList';
import SortForm from './SortForm';

const ThreadList = ({ threads, setThreads, loading, filter }) => {
    const [tags, setTags] = useState([]);
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [filtered, setFiltered] = useState(threads);
    const navigate = useNavigate();

    useEffect(() => {
        if (tags.length === 0) return setFiltered(threads);
        setFiltered(threads.filter(thread => thread.tagIds.some(id => tags.some(tag => tag.id === id))));
    }, [tags, setThreads, setFiltered]);

    useEffect(() => setTags([]), [filter]);

    useEffect(() => setFiltered(threads), [threads]);

    return (
        <div className='mt-5'>
            <div className='flex items-center gap-10 justify-between'>
                <div className='flex-wrap items-center flex gap-2'>
                    <span className='text-sm text-primary font-semibold'>Tags</span>
                    <TagList tags={tags} />
                    <button onClick={() => setIsEditingTags(prev => !prev)}>
                        <RxGear color='gray' />
                    </button>
                    {isEditingTags && <TagPicker tags={tags} setTags={setTags} action={tags => setTags(tags)} closePopup={() => setIsEditingTags(false)} />}
                </div>
                <SortForm setThreads={setFiltered} />
            </div>

            {!loading && threads.length === 0 ? (
                <div className='flex justify-center items-center h-[300px]'>
                    <p className='text-sm text-gray-400'>No posts found</p>
                </div>
            ) : (
                <div className='flex flex-col gap-4 mt-3 py-2'>
                    {loading ? (
                        <SkeletonList count={5} />
                    ) : (
                        filtered.map(thread => (
                            <div key={thread.id} onClick={() => navigate(`/thread/${thread.id}`)} className='hover:cursor-pointer'>
                                <ThreadCard key={thread.id} {...thread} short />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ThreadList;
