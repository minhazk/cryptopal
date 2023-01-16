import React, { useEffect, useState } from 'react';
import OverlayWrapper from './OverlayWrapper';
import DmCard from './DmCard';
import Chat from './Chat';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { FaRegWindowMinimize } from 'react-icons/fa';
import { FiMaximize2 } from 'react-icons/fi';
import { useUserContext } from '../context/UserContext';

const MessagesOverlay = () => {
    const { user, getFollowers } = useUserContext();
    const [activeOverlay, setActiveOverlay] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [recentChats, setRecentChats] = useState([]);

    useEffect(() => {
        if (user === null) return;
        getFollowers().then(setRecentChats);
    }, []);

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
        <div className='fixed right-[5%] flex gap-5 z-[50] transition-all duration-300' style={{ bottom: activeOverlay ? '-276px' : '0' }}>
            {activeChat && (
                <OverlayWrapper
                    iconUrl={activeChat.photoURL}
                    title={activeChat.recipient}
                    recipientId={activeChat.recipientId}
                    action={
                        <div className='flex items-center gap-2'>
                            <button onClick={() => setActiveOverlay(prev => !prev)}>{activeOverlay ? <FaRegWindowMinimize /> : <FiMaximize2 size={20} />}</button>
                            <button onClick={() => setActiveChat(null)}>
                                <IoMdClose size={25} />
                            </button>
                        </div>
                    }
                >
                    <Chat chat={chat} />
                </OverlayWrapper>
            )}

            <OverlayWrapper
                iconUrl={user?.photoURL}
                title='Messaging'
                activeOverlay={activeOverlay}
                action={
                    <button style={{ pointerEvents: 'auto' }} onClick={() => setActiveOverlay(prev => !prev)}>
                        {!activeOverlay ? <HiOutlineChevronUp size={25} /> : <HiOutlineChevronDown size={25} />}
                    </button>
                }
            >
                <div className='flex flex-col overflow-y-auto h-full'>
                    {recentChats.map(chat => (
                        <DmCard key={chat.id} {...chat} setActiveChat={setActiveChat} />
                    ))}
                </div>
            </OverlayWrapper>
        </div>
    );
};

export default MessagesOverlay;
