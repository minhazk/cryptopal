import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TagList from '../TagList';

const Sidebar = ({ burgerOpen, CUT_OFF }) => {
    const [position, setPosition] = useState(window.innerWidth < CUT_OFF ? (!burgerOpen ? '-100%' : 0) : 'unset');

    useEffect(() => {
        setPosition(window.innerWidth < CUT_OFF ? (!burgerOpen ? '-100%' : 0) : 'unset');
    }, [burgerOpen]);

    useEffect(() => {
        const resize = () => setPosition(window.innerWidth > CUT_OFF ? 'unset' : '-100%');
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    const dummyTags = [
        { id: 1123, label: 'ADA', color: '#C339BE' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
        { id: 3123, label: 'USDT', color: '#775BE9' },
        { id: 4123, label: 'BTC', color: '#FF7979' },
    ];

    return (
        <aside
            className='min-w-[unset] w-52 md:min-w-[10rem] lg:min-w-[11rem] mr-1 z-40 lg:mr-0 py-10 md:py-6 bg-primary md:bg-transparent text-white md:text-black rounded-r-lg px-4 lg:px-4 absolute md:relative transition-[left] duration-500'
            style={{ left: position }}
        >
            <ul className='text-center text-sm font-medium flex flex-col gap-6 md:gap-4'>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/your threads'>Your Threads</Link>
                </li>
                <li>
                    <Link to='/saved'>Saved</Link>
                </li>
                <li>
                    <Link to='/following'>Following</Link>
                </li>
            </ul>

            <h3 className='font-semibold text-center my-8 mb-4 md:mb-2'>Popular Tags</h3>
            <div className='flex gap-3 md:gap-2 flex-wrap'>
                <TagList tags={dummyTags} />
            </div>
        </aside>
    );
};

export default Sidebar;
