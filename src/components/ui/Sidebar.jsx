import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import TagList from '../TagList';

const Sidebar = ({ burgerOpen, CUT_OFF }) => {
    const [position, setPosition] = useState(window.innerWidth < CUT_OFF ? (!burgerOpen ? '-100%' : 0) : 'unset');
    const { getAllTags } = useUserContext();
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        getAllTags().then(setAllTags);
    }, []);

    useEffect(() => {
        setPosition(window.innerWidth < CUT_OFF ? (!burgerOpen ? '-100%' : 0) : 'unset');
    }, [burgerOpen]);

    useEffect(() => {
        const resize = () => setPosition(window.innerWidth > CUT_OFF ? 'unset' : '-100%');
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <aside
            className='min-w-[unset] w-[170px] md:min-w-[10rem] lg:min-w-[11rem] mr-1 z-40 lg:mr-0 py-10 md:py-6 bg-primary md:bg-transparent text-white md:text-black rounded-r-lg px-4 lg:px-4 absolute md:relative transition-[left] duration-500'
            style={{ left: position }}
        >
            <ul className='text-center text-sm font-medium flex flex-col gap-6 md:gap-4'>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/home/my_threads'>Your Threads</Link>
                </li>
                <li>
                    <Link to='/home/saved'>Saved</Link>
                </li>
                <li>
                    <Link to='/home/following'>Following</Link>
                </li>
            </ul>

            <h3 className='font-semibold text-center my-8 mb-4 md:mb-2'>Popular Tags</h3>
            <div className='flex gap-3 md:gap-2 flex-wrap'>
                <TagList tags={allTags} />
            </div>
        </aside>
    );
};

export default Sidebar;
