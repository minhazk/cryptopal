import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { colours } from '../utils/colours';
import { formatTime } from '../utils/TimeFormatter';
import ChatForm from './ChatForm';
import UserIcon from './UserIcon';

const Chat = ({ activeChat, scroll }) => {
    const ref = useRef();
    const { user, getChat } = useUserContext();
    const [chat, setChat] = useState([]);

    useEffect(() => {
        if (user === null) return;
        getChat(activeChat.recipientId).then(chat => {
            setChat(chat);
            if (scroll) ref.current.scrollIntoView({ behavior: 'smooth' });
        });
    }, [activeChat?.recipientId]);

    useEffect(() => scroll && ref.current.scrollIntoView({ behavior: 'smooth' }), [chat]);

    return (
        <>
            <div className='h-full flex flex-col overflow-y-scroll'>
                <div className='mt-auto'></div>
                {chat.map(message => (
                    <ChatMessage key={message.id} {...message} />
                ))}
                <div ref={ref} />
            </div>
            <ChatForm setChat={setChat} recipientId={activeChat?.recipientId} />
        </>
    );
};

function ChatMessage({ senderId, displayName: name, imgUrl, body: message, timestamp }) {
    const { user } = useUserContext();

    return (
        <div className='flex gap-2 px-2'>
            <div className='py-2'>
                <UserIcon src={imgUrl} width='30px' />
            </div>
            <div className='flex flex-col'>
                <div>
                    <span className='text-primary text-[10px] font-semibold mr-2'>{name}</span>
                    <span className='text-gray-400 text-[10px]'>{formatTime(timestamp)}</span>
                </div>
                <div
                    className='rounded py-1 px-2 text-[11px] leading-4 w-full'
                    style={{ backgroundColor: senderId === user?.id ? '#e5e7eb' : colours.primary, color: senderId === user?.id ? 'black' : 'white' }}
                >
                    {message}
                </div>
            </div>
        </div>
    );
}

export default Chat;
