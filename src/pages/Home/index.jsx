import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TagPicker from '../../components/TagPicker';
import Page from '../../components/ui/Page';
import { useThreadContext } from '../../context/ThreadContext';
import { useUserContext } from '../../context/UserContext';
import CreateForm from './CreateForm';
import ThreadList from './ThreadList';

const Home = () => {
    const { search } = useLocation();
    const { user } = useUserContext();
    const { getAllThreads } = useThreadContext();
    const [threads, setThreads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) return;
        getAllThreads().then(setThreads);
    }, [user]);

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
            <CreateForm setThreads={setThreads} />
            <ThreadList threads={threads} />
        </Page>
    );
};

export default Home;
