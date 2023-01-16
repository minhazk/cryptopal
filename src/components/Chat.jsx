import React, { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useUserContext } from '../context/UserContext';
import { colours } from '../utils/colours';
import { formatTime } from '../utils/TimeFormatter';
import UserIcon from './UserIcon';

const Chat = ({ recipientId }) => {
    const ref = useRef();
    const { user, getChat, sendMessage } = useUserContext();
    const [chat, setChat] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        if (user === null) return;
        getChat(recipientId)
            .then(setChat)
            .finally(() => ref.current.scrollIntoView());
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const body = inputRef.current.value;
        if (body === '' || body === null) return;
        sendMessage(recipientId, body).then(msg => setChat(prev => [...prev, msg]));
    }

    return (
        <>
            <div className='h-full flex flex-col overflow-y-scroll'>
                <div className='mt-auto'></div>
                {chat.map(message => (
                    <ChatMessage key={message.id} {...message} />
                ))}
                <div ref={ref} />
            </div>
            <form handleSubmit={handleSubmit} className='flex items-center gap-1 py-2 pl-2 pr-1'>
                <div className='grow'>
                    <input ref={inputRef} className='w-full text-xs py-[6px] px-2 rounded border border-gray-300 outline-none' autoFocus />
                </div>
                <button type='submit' className='p-1 hover:bg-gray-100 transition-colors'>
                    <MdSend size={20} />
                </button>
            </form>
        </>
    );
};

function ChatMessage({ displayName: name, imgUrl, body: message, timestamp }) {
    const currentUser = 'John Doe';

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
                    style={{ backgroundColor: name === currentUser ? '#e5e7eb' : colours.primary, color: name === currentUser ? 'black' : 'white' }}
                >
                    {message}
                </div>
            </div>
        </div>
    );
}

export default Chat;
