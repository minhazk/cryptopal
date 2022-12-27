import React from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList';
import { BsArrowReturnRight } from 'react-icons/bs';

const SideProfile = () => {
    const dummyTags = [
        { id: 4123, label: 'BTC', color: '#FF7979' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
    ];
    const recentComments = [
        {
            id: 1231211,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            parentId: 12,
        },
        {
            id: 2312,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            parentId: 12,
        },
        {
            id: 323123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            parentId: 12,
        },
        {
            id: 4123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            parentId: 12,
        },
    ];

    return (
        <sidebar className='flex flex-col items-center gap-3 w-60 ml-3 py-5'>
            <div className='rounded-full w-28 aspect-square overflow-hidden'>
                <img className='w-full h-full cover' src='https://source.unsplash.com/random/3' />
            </div>
            <p className='text-lg text-primary font-semibold'>John Doe</p>
            <div className='bg-[#E0DBF6] rounded-full py-[6px] px-3'>
                <p className='text-accent font-semibold text-sm'>120 points</p>
            </div>
            <div className='flex gap-2'>
                <TagList tags={dummyTags} />
            </div>
            <h3 className='font-semibold text-center my-8 mb-2'>Recent Activity</h3>
            <div className='bg-white py-3 px-3 flex flex-col gap-2'>
                {recentComments.map(comment => (
                    <Link key={comment.id} to={`/thread/${comment.parentId}`} className='text-primary text-[11px] flex gap-2 '>
                        <BsArrowReturnRight size={30} />
                        <p className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', '-webkit-line-clamp': 2, '-webkit-box-orient': 'vertical' }}>
                            {comment.body}
                        </p>
                    </Link>
                ))}
            </div>
        </sidebar>
    );
};

export default SideProfile;
