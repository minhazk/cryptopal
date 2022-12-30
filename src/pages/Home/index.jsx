import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TagPicker from '../../components/TagPicker';
import Page from '../../components/ui/Page';
import CreateForm from './CreateForm';
import ThreadList from './ThreadList';

const Home = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    return (
        <Page>
            {search === '?signUp=true' && (
                <TagPicker
                    setTags={tags => {
                        // set the tags parameter in this func to the database user interests
                        navigate('/home');
                    }}
                    closePopup={() => navigate('/home')}
                />
            )}
            <CreateForm />
            <ThreadList />
        </Page>
    );
};

export default Home;
