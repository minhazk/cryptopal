import React from 'react';
import { formatTime } from '../utils/TimeFormatter';
import UserIcon from './UserIcon';

const DmCard = ({ id, imgUrl, name, lastMessage, timestamp, setActiveChat }) => {
    return (
        <button onClick={() => setActiveChat({ id, imgUrl, recipient: name })} className='flex gap-2 pt-2 px-1 hover:bg-gray-200'>
            <div>
                <UserIcon src={imgUrl} width='40px' />
            </div>

            <div className='grow flex flex-col pr-2 border-b border-gray-300 pb-2'>
                <div className='flex justify-between gap-2 items-center'>
                    <span className='text-primary text-sm font-medium'>{name}</span>
                    <span className='text-gray-400 text-[11px]'>{formatTime(timestamp)}</span>
                </div>
                <p className='text-[11px] mb-text-ellipsis overflow-hidden text-left' style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                    {name}: {lastMessage}
                </p>
            </div>
        </button>
    );
};

export default DmCard;
