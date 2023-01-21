import React, { useState } from 'react';
import Chat from '../../components/Chat';
import DmCard from '../../components/DmCard';
import Page from '../../components/ui/Page';
import { BiLeftArrowAlt } from 'react-icons/bi';
import useMessaging from '../../hooks/useMessaging';

const Messaging = () => {
    const [activeChat, setActiveChat] = useState(null);
    const { recentChats } = useMessaging();

    const chat = [
        {
            id: 12312,
            name: 'John Doe',
            imgUrl: 'https://source.unsplash.com/random/3',
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            timestamp: new Date(),
        },
        {
            id: 23213,
            name: 'Minhaz Karim',
            imgUrl: 'https://source.unsplash.com/random/4',
            message: 'Type a Lorem Ipsum is simply dummy text of the printing.',
            timestamp: new Date(),
        },
        {
            id: 3213,
            name: 'John Doe',
            imgUrl: 'https://source.unsplash.com/random/3',
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            timestamp: new Date(),
        },
    ];

    return (
        <Page>
            {!activeChat ? (
                <div className='flex flex-col'>
                    {recentChats.map(chat => (
                        <DmCard key={chat.id} {...chat} setActiveChat={setActiveChat} />
                    ))}
                </div>
            ) : (
                <div style={{ height: '40rem' }}>
                    <div className='mb-2 flex gap-2 items-center'>
                        <button onClick={() => setActiveChat(null)} className='text-primary'>
                            <BiLeftArrowAlt size={25} />
                        </button>
                        <span className='text font-medium'>{activeChat.recipient}</span>
                    </div>
                    <Chat activeChat={activeChat} />
                </div>
            )}
        </Page>
    );
};

export default Messaging;
