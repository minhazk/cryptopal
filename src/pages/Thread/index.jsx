import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentContainer from '../../components/ui/ContentContainer';
import Header from '../../components/ui/Header';
import Page from '../../components/ui/Page';
import Sidebar from '../../components/ui/Sidebar';
import SideProfile from '../../components/ui/SideProfile';
import ThreadCard from '../../components/ui/ThreadCard';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Thread = () => {
    const { id } = useParams();
    const dummyThread = {
        id: 12321312,
        tags: [
            { id: 4123, label: 'BTC', color: '#FF7979' },
            { id: 2213, label: 'ETH', color: '#28A1C7' },
        ],
        title: 'Thread title',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
        author: 'John Doe',
        timestamp: Date.now(),
        gold: 2,
        silver: 7,
        bronze: 11,
    };
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
                    id: 132,
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
                    id: 132,
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
    const [comments, setComments] = useState(dummyComments);

    return (
        <Page>
            <ThreadCard {...dummyThread} />
            <p className='font-semibold text-sm my-4'>Replies {`(${comments.length})`}</p>
            <div className='flex flex-col gap-3'>
                <CommentForm setComments={setComments} />
                {comments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </div>
        </Page>
    );
};

export default Thread;
