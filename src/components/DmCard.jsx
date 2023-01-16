import React from 'react';
import { formatTime } from '../utils/TimeFormatter';
import UserIcon from './UserIcon';

const DmCard = ({ id, photoURL, displayName, lastMessage, timestamp, setActiveChat }) => {
    return (
        <button onClick={() => setActiveChat({ recipientId: id, photoURL, recipient: displayName })} className='flex gap-2 pt-2 px-1 hover:bg-gray-200'>
            <div>
                <UserIcon src={photoURL} width='40px' />
            </div>

            <div className='grow flex justify-center flex-col pr-2 border-b border-gray-300 pb-2 h-10'>
                <div className='flex justify-between gap-2 items-center'>
                    <span className='text-primary text-xs whitespace-nowrap font-medium'>{displayName}</span>
                    {timestamp && <span className='text-gray-400 text-[11px]'>{formatTime(timestamp)}</span>}
                </div>
                {lastMessage && (
                    <p className='text-[10.5px] mb-text-ellipsis overflow-hidden text-left' style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                        {displayName}: {lastMessage}
                    </p>
                )}
            </div>
        </button>
    );
};

export default DmCard;
