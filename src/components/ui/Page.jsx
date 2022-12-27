import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SideProfile from './SideProfile';

const Page = ({ children }) => {
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const CUT_OFF = 768;

    useEffect(() => {
        const resize = () => setBurgerOpen(false) && setProfileOpen(false);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <>
            <Header setBurgerOpen={setBurgerOpen} burgerOpen={burgerOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
            <div className='mx-auto px-5 pb-10 flex lg:max-w-[85%] xl:max-w-[1300px]'>
                <Sidebar burgerOpen={burgerOpen} CUT_OFF={CUT_OFF} />
                <div className='grow'>{children}</div>
                <SideProfile profileOpen={profileOpen} CUT_OFF={CUT_OFF} />
            </div>
        </>
    );
};

export default Page;
