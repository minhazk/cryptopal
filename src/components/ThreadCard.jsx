import React from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { formatTime } from '../utils/TimeFormatter';
import TagList from './TagList';
import Stars from './ui/Stars';

const ThreadCard = ({ id, tags, title, body, author, timestamp, gold, silver, bronze, short }) => {
    return (
        <div className='bg-white rounded shadow-sm px-3 py-4 flex gap-3'>
            <div className='flex flex-col gap-1 items-center pt-1'>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className='hover:shadow-md focus:shadow-md'
                >
                    <HiOutlineChevronUp size={25} />
                </button>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className='hover:shadow-md focus:shadow-md'
                >
                    <HiOutlineChevronDown size={25} />
                </button>
            </div>

            <div className='w-full'>
                <div className='flex gap-2'>
                    <TagList tags={tags} />
                </div>
                <h3 className='text-primary font-semibold text-sm mt-3 mb-2'>{title}</h3>
                {short ? (
                    <p className='text-xs text-ellipsis overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                        {body}
                    </p>
                ) : (
                    <p className='text-xs'>{body}</p>
                )}
                <p className='my-2'>
                    <span className='text-accent font-semibold  text-xs'>{author}</span>
                    <span className='text-gray-400 font-light text-[11px] ml-2'>{formatTime(timestamp)}</span>
                </p>
                <div className='flex items-center gap-4'>
                    <Stars num={gold} tier='gold' />
                    <Stars num={silver} tier='silver' />
                    <Stars num={bronze} tier='bronze' />
                </div>
            </div>
        </div>
    );
};

export default ThreadCard;
