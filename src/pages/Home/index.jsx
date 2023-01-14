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
            {!loading && threads.length === 0 ? (
                <div className='flex justify-center items-center h-full'>
                    <p className='text-sm text-gray-400'>No posts found</p>
                </div>
            ) : (
                <ThreadList threads={threads} loading={loading} />
            )}
        </Page>
    );
};

export default Home;
