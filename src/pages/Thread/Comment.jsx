import React from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { formatTime } from '../../utils/TimeFormatter';
import Stars from '../../components/ui/Stars';

const Comment = ({ id, author, timestamp, body, gold, silver, bronze }) => {
    return (
        <div>
            <div className='bg-white rounded shadow-sm px-3 py-4 flex gap-3'>
                <div className='flex flex-col items-center pt-2'>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className='hover:shadow-sm z-10'
                    >
                        <HiOutlineChevronUp size={22} />
                    </button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className='hover:shadow-sm'
                    >
                        <HiOutlineChevronDown size={22} />
                    </button>
                </div>

                <div>
                    <p>
                        <span className='text-accent font-medium text-xs'>{author}</span>
                        <span className='text-gray-300 font-light text-[11px] ml-2'>{formatTime(timestamp)}</span>
                    </p>
                    <p className='text-xs mt-1 mb-3'>{body}</p>
                    <div className='flex items-center gap-4'>
                        <Stars num={gold} tier='gold' />
                        <Stars num={silver} tier='silver' />
                        <Stars num={bronze} tier='bronze' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
