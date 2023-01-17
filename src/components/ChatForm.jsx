import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useUserContext } from '../context/UserContext';

const ChatForm = ({ setChat, recipientId }) => {
    const [value, setValue] = useState('');
    const { sendMessage } = useUserContext();

    async function handleSubmit(e) {
        e.preventDefault();
        if (value === '' || value === null) return;
        sendMessage(recipientId, value).then(msg => {
            setChat(prev => [...prev, msg]);
            setValue('');
        });
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-1 py-2 pl-2 pr-1'>
            <div className='grow'>
                <input value={value} onChange={e => setValue(e.target.value)} className='w-full text-xs py-[6px] px-2 rounded border border-gray-300 outline-none' autoFocus />
            </div>
            <button type='submit' className='p-1 hover:bg-gray-100 transition-colors'>
                <MdSend size={20} />
            </button>
        </form>
    );
};

export default ChatForm;
