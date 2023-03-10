import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/ui/Page';
import ThreadCard from '../../components/ThreadCard';
import CommentForm from './CommentForm';
import { useThreadContext } from '../../context/ThreadContext';
import CommentList from './CommentList';
import { useUserContext } from '../../context/UserContext';
import SkeletonThread from './SkeletonThread';

const Thread = () => {
    const { id } = useParams();
    const { user } = useUserContext();
    const { getThreadById, getThreadComments } = useThreadContext();
    const [thread, setThread] = useState(null);
    const [comments, setComments] = useState(null);
    const groupedComments = useMemo(() => {
        if (comments === null) return {};
        const group = {};
        comments.forEach(comment => {
            group[comment.parentCommentId] ||= [];
            group[comment.parentCommentId].push(comment);
        });
        return group;
    }, [comments]);

    const rootComments = groupedComments[null];

    useEffect(() => {
        if (user === null) return;
        getThreadById(id).then(setThread);
        getThreadComments(id).then(setComments);
    }, [user]);

    return (
        <Page>
            {thread ? <ThreadCard {...thread} /> : <SkeletonThread />}
            <p className='font-semibold text-sm my-4'>Replies {comments !== null ? `(${comments.length})` : '(0)'}</p>
            <div className='flex flex-col gap-3'>
                <CommentForm setComments={setComments} parentThreadId={id} />
                {rootComments != null && rootComments.length > 0 && <CommentList comments={rootComments} groupedComments={groupedComments} setComments={setComments} />}
            </div>
        </Page>
    );
};

export default Thread;
