import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TagPicker from '../../components/TagPicker';
import Page from '../../components/ui/Page';
import { useThreadContext } from '../../context/ThreadContext';
import { useUserContext } from '../../context/UserContext';
import CreateForm from './CreateForm';
import ThreadList from './ThreadList';

const Home = ({ filter }) => {
    const { search } = useLocation();
    const { user } = useUserContext();
    const { updateUserTags } = useUserContext();
    const { getAllThreads } = useThreadContext();
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) return;
        getAllThreads(filter).then(threads => {
            setThreads(threads);
            setLoading(false);
        });
    }, [user, filter]);

    useEffect(() => {
        setLoading(true);
    }, [filter]);

    return (
        <Page>
            {search === '?signUp=true' && (
                <TagPicker
                    closePopup={tags => {
                        updateUserTags(tags.map(tag => tag.id));
                        navigate('/home');
                    }}
                />
            )}
            <CreateForm setThreads={setThreads} />
            <ThreadList threads={threads} setThreads={setThreads} loading={loading} filter={filter} />
        </Page>
    );
};

export default Home;
