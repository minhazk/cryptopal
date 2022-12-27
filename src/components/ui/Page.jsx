import React, { useEffect, useState } from 'react';
import ContentContainer from './ContentContainer';
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
            <ContentContainer>
                <Sidebar burgerOpen={burgerOpen} CUT_OFF={CUT_OFF} />
                <div>{children}</div>
                <SideProfile profileOpen={profileOpen} CUT_OFF={CUT_OFF} />
            </ContentContainer>
        </>
    );
};

export default Page;
