import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList';
import { BsArrowReturnRight } from 'react-icons/bs';

const SideProfile = ({ profileOpen, CUT_OFF }) => {
    const [position, setPosition] = useState(window.innerWidth < CUT_OFF ? (!profileOpen ? '-100%' : 0) : 'unset');

    useEffect(() => {
        setPosition(window.innerWidth < CUT_OFF ? (!profileOpen ? '-100%' : 0) : 'unset');
    }, [profileOpen]);

    useEffect(() => {
        const resize = () => setPosition(window.innerWidth > CUT_OFF ? 'unset' : '-100%');
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const dummyTags = [
        { id: 4123, label: 'BTC', color: '#FF7979' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
    ];
    const recentComments = [
        {
            id: 123123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ipsum sit amet',
            parentId: 12,
        },
        {
            id: 2312,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            parentId: 12,
        },
        {
            id: 323123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ipsum sit amet',
            parentId: 12,
        },
        {
            id: 4123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            parentId: 12,
        },
    ];

    return (
        <div
            className='flex flex-col items-center gap-3 w-52 md:w-56 ml-3 py-5 px-4 z-40 bg-white md:bg-transparent rounded-l-lg shadow-lg md:shadow-none absolute md:relative transition-[right] duration-500'
            style={{ right: position }}
        >
            <div className='rounded-full w-28 aspect-square overflow-hidden'>
                <img className='w-full h-full cover' src='https://source.unsplash.com/random/3' />
            </div>
            <p className='text-lg text-primary font-semibold'>John Doe</p>
            <div className='bg-[#E0DBF6] rounded-full py-[6px] px-3'>
                <p className='text-accent font-semibold text-xs'>120 points</p>
            </div>
            <div className='flex gap-2 mt-2'>
                <TagList tags={dummyTags} />
            </div>
            <h3 className='font-semibold text-center my-2 md:my-4 mb-2'>Recent Activity</h3>
            <div className='py-3 px-3 flex flex-col gap-2 rounded-md shadow-sm bg-[#E0DBF6] md:bg-white'>
                {recentComments.map(comment => (
                    <Link key={comment.id} to={`/thread/${comment.parentId}`} className='text-primary text-[11px] flex gap-2 '>
                        <div className='flex items-center'>
                            <BsArrowReturnRight size={15} />
                        </div>
                        <p className='text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                            {comment.body}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideProfile;
