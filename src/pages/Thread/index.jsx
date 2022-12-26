import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentContainer from '../../components/ui/ContentContainer';
import Header from '../../components/ui/Header';
import ThreadCard from '../../components/ui/ThreadCard';
import Comment from './Comment';

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
            children: [23, 34, 45],
        },
    ];
    const [comments, setComments] = useState(dummyComments);

    return (
        <>
            <Header />
            <ContentContainer>
                <ThreadCard {...dummyThread} />
                <p className='font-semibold text-sm my-4'>Replies</p>
                <div>
                    {comments.map(comment => (
                        <Comment key={comment.id} {...comment} />
                    ))}
                </div>
            </ContentContainer>
        </>
    );
};

export default Thread;
