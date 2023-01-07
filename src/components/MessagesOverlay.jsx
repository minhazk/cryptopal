import React, { useState } from 'react';
import OverlayWrapper from './OverlayWrapper';
import DmCard from './DmCard';
import Chat from './Chat';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { FaRegWindowMinimize } from 'react-icons/fa';
import { FiMaximize2 } from 'react-icons/fi';
import { useUserContext } from '../context/UserContext';

const MessagesOverlay = () => {
    const { user } = useUserContext();
    const [activeOverlay, setActiveOverlay] = useState(false);
    const [minimizeChat, setMinimizeChat] = useState(true);
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
        <div className='fixed bottom-0 right-[5%] flex gap-5 z-[50]' style={{ pointerEvents: activeChat ? 'auto' : 'none' }}>
            {activeChat && (
                <OverlayWrapper
                    iconUrl={activeChat.imgUrl}
                    title={activeChat.recipient}
                    activeOverlay={minimizeChat}
                    action={
                        <div className='flex items-center gap-2'>
                            <button onClick={() => setMinimizeChat(prev => !prev)}>{minimizeChat ? <FaRegWindowMinimize /> : <FiMaximize2 size={20} />}</button>
                            <button onClick={() => setActiveChat(null) && setMinimizeChat(false)}>
                                <IoMdClose size={25} />
                            </button>
                        </div>
                    }
                >
                    <Chat chat={chat} />
                </OverlayWrapper>
            )}

            <OverlayWrapper
                iconUrl={user?.photoUrl}
                title='Messaging'
                activeOverlay={activeOverlay}
                action={
                    <button style={{ pointerEvents: 'auto' }} onClick={() => setActiveOverlay(prev => !prev)}>
                        {!activeOverlay ? <HiOutlineChevronUp size={25} /> : <HiOutlineChevronDown size={25} />}
                    </button>
                }
            >
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
