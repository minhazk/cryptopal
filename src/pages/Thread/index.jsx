import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/ui/Page';
import ThreadCard from '../../components/ThreadCard';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useThreadContext } from '../../context/ThreadContext';

const Thread = () => {
    const { id } = useParams();
    const { getThreadById, getThreadComments } = useThreadContext();
    const [thread, setThread] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        (async () => {
            setThread(await getThreadById(id));
            setComments(await getThreadComments(id));
        })();
    }, []);

    console.log(comments);
    const dummyComments = [
        {
            id: 12,
            author: 'John Doe',
            timestamp: Date.now(),
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar.',
            silver: 2,
            gold: 7,
            bronze: 11,
            childComments: [],
        },
        {
            id: 76,
            author: 'John Doe',
            timestamp: Date.now(),
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar.',
            silver: 2,
            gold: 7,
            bronze: 11,
            childComments: [
                {
                    id: 133122131322,
                    author: 'John Doe',
                    timestamp: Date.now(),
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar.',
                    silver: 2,
                    gold: 7,
                    bronze: 11,
                    childComments: [
                        {
                            id: 12,
                            author: 'John Doe',
                            timestamp: Date.now(),
                            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar.',
                            silver: 2,
                            gold: 7,
                            bronze: 11,
                            childComments: [],
                        },
                    ],
                },
                {
                    id: 1232,
                    author: 'John Doe',
                    timestamp: Date.now(),
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar.',
                    silver: 2,
                    gold: 7,
                    bronze: 11,
                    childComments: [],
                },
            ],
        },
        {
            id: 23,
            author: 'John Doe',
            timestamp: Date.now(),
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar.',
            silver: 2,
            gold: 7,
            bronze: 11,
            childComments: [],
        },
    ];

    return (
        <Page>
            {thread && <ThreadCard {...thread} />}
            <p className='font-semibold text-sm my-4'>Replies {comments !== null ? `(${comments.length})` : 0}</p>
            <div className='flex flex-col gap-3'>
                <CommentForm setComments={setComments} parentThreadId={id} />
                {/* {comments && comments.map(comment => <Comment key={comment.id} {...comment} parentThreadId={id} />)} */}
            </div>
        </Page>
    );
};

export default Thread;
