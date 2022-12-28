import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import MessagesOverlay from '../MessagesOverlay';
import Sidebar from './Sidebar';
import SideProfile from './SideProfile';

const Page = ({ children, hideSideProfile }) => {
    const CUT_OFF = 768;
    const location = useLocation();
    const navigate = useNavigate();
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [showChatOverlap, setShowChatOverlay] = useState(window.innerWidth > CUT_OFF);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth > CUT_OFF && location.pathname === '/messaging') navigate('/home');
            setShowChatOverlay(window.innerWidth > CUT_OFF) && setBurgerOpen(false) && setProfileOpen(false);
        };
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <>
            <Header setBurgerOpen={setBurgerOpen} burgerOpen={burgerOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen} hideSideProfile={hideSideProfile} />
            <div className='mx-auto px-5 pb-10 flex lg:max-w-[85%] xl:max-w-[1300px]'>
                <Sidebar burgerOpen={burgerOpen} CUT_OFF={CUT_OFF} />
                <div className='grow'>{children}</div>
                {!hideSideProfile && <SideProfile profileOpen={profileOpen} CUT_OFF={CUT_OFF} />}
            </div>
            {showChatOverlap && <MessagesOverlay />}
        </>
    );
};

export default Page;
