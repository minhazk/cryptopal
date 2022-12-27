import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList';

const Sidebar = () => {
    const CUT_OFF = 639;
    const [burger, setBurger] = useState(window.innerWidth < CUT_OFF);

    useEffect(() => {
        const resize = () => (window.innerWidth > CUT_OFF ? setBurger(false) : setBurger(true));
        window.addEventListener('resize', resize);
        return window.removeEventListener('resize', resize);
    }, []);

    const dummyTags = [
        { id: 1123, label: 'ADA', color: '#C339BE' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
        { id: 3123, label: 'USDT', color: '#775BE9' },
        { id: 4123, label: 'BTC', color: '#FF7979' },
    ];

    return (
        <sidebar className='resize-none w-48 mr-5 py-6 absolute md:relative -left-full md:left-0'>
            <ul className='text-center text-sm font-medium flex flex-col gap-4'>
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

            <h3 className='font-semibold text-center my-8 mb-2'>Popular Tags</h3>
            <div className='flex gap-2 flex-wrap'>
                <TagList tags={dummyTags} />
            </div>
        </sidebar>
    );
};

export default Sidebar;
