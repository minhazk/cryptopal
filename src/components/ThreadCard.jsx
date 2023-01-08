import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { formatTime } from '../utils/TimeFormatter';
import TagList from './TagList';
import Stars from './ui/Stars';

const ThreadCard = ({ id, tags, title, body, author, authorId, timestamp, gold, silver, bronze, short }) => {
    return (
        <div className='bg-white rounded shadow px-3 py-4 flex gap-3'>
            <div className='flex flex-col gap-1 items-center pt-1'>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className='hover:shadow-md'
                >
                    <HiOutlineChevronUp size={25} />
                </button>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className='hover:shadow-md'
                >
                    <HiOutlineChevronDown size={25} />
                </button>
            </div>

            <div className='w-full'>
                {tags && tags.length > 0 && (
                    <div className='flex gap-2 mb-3'>
                        <TagList tags={tags} />
                    </div>
                )}
                <h3 className='text-primary font-semibold text-sm mb-2'>{title}</h3>
                {short ? (
                    <p className='text-xs text-ellipsis overflow-hidden mr-2' style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {body}
                    </p>
                ) : (
                    <p className='text-xs mr-2'>{body}</p>
                )}
                <p className='my-2'>
                    <Link to={`/profile/${authorId}`} className='text-accent font-semibold hover:underline text-xs'>
                        {author}
                    </Link>
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
