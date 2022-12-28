import React, { useState } from 'react';
import OverlayWrapper from './OverlayWrapper';
import DmCard from './DmCard';
import Chat from './Chat';

const MessagesOverlay = () => {
    const [activeChat, setActiveChat] = useState(null);

    const dummyChats = [
        {
            id: 123123,
            imgUrl: 'https://source.unsplash.com/random/4',
            name: 'Minhaz Karim',
            lastMessage: 'Lorem Ipsum is simply dummy text',
            timestamp: new Date(),
        },
        {
            id: 23423,
            imgUrl: 'https://source.unsplash.com/random/5',
            name: 'Mina',
            lastMessage: 'Lorem Ipsum is simply dummy text',
            timestamp: new Date(),
        },
    ];

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
    ];

    return (
        <div className='absolute bottom-0 right-[5%] flex gap-5'>
            {activeChat && (
                <OverlayWrapper iconUrl={activeChat.imgUrl} title={activeChat.recipient}>
                    <Chat chat={chat} />
                </OverlayWrapper>
            )}

            <OverlayWrapper iconUrl='https://source.unsplash.com/random/3' title='Messaging'>
                <div className='flex flex-col overflow-y-auto h-full'>
                    {dummyChats.map(chat => (
                        <DmCard key={chat.id} {...chat} setActiveChat={setActiveChat} />
                    ))}
                </div>
            </OverlayWrapper>
        </div>
    );
};

export default MessagesOverlay;
