import React from 'react';
import Page from '../../components/ui/Page';
import CreateForm from './CreateForm';
import ThreadList from './ThreadList';

const Home = () => {
    return (
        <Page>
            <CreateForm />
            <ThreadList />
        </Page>
    );
};

export default Home;
