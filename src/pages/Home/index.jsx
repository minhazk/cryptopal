import React from 'react';
import ContentContainer from '../../components/ui/ContentContainer';
import Header from '../../components/ui/Header';
import CreateForm from './CreateForm';
import ThreadList from './ThreadList';

const Home = () => {
    return (
        <>
            <Header />
            <ContentContainer>
                <CreateForm />
                <ThreadList />
            </ContentContainer>
        </>
    );
};

export default Home;
