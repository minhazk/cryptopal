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
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
        {
            id: 2312,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
        {
            id: 323123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ipsum sit amet',
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
        {
            id: 4123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
    ];

    return (
        <div
            className='flex flex-col items-center gap-3 min-w-[unset] w-52 md:min-w-[11rem] xl:min-w-[13rem] py-5 px-4 z-40 bg-white md:bg-transparent rounded-l-lg shadow-lg md:shadow-none absolute md:relative transition-[right] duration-500'
            style={{ right: position }}
        >
            <div className='rounded-full w-28 aspect-square overflow-hidden'>
                <img className='w-full h-full object-cover' src='https://source.unsplash.com/random/3' />
            </div>
            <Link to={`/profile/${1}`} className='text-lg text-primary font-semibold hover:underline focus:underline'>
                John Doe
            </Link>
            <Link to='/about' className='bg-[#E0DBF6] text-accent font-semibold text-xs rounded-full py-[6px] px-3 transition-colors hover:bg-accent focus:bg-accent hover:text-white focus:text-white'>
                120 points
            </Link>
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
