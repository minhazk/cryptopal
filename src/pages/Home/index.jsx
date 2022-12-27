import React from 'react';
import ContentContainer from '../../components/ui/ContentContainer';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SideProfile from '../../components/ui/SideProfile';
import CreateForm from './CreateForm';
import ThreadList from './ThreadList';

const Home = () => {
    return (
        <>
            <Header />
            <ContentContainer>
                <Sidebar />
                <div>
                    <CreateForm />
                    <ThreadList />
                </div>
                <SideProfile />
            </ContentContainer>
        </>
    );
};

export default Home;
