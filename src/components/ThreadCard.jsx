import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { FiTrash } from 'react-icons/fi';
import { RiEdit2Line } from 'react-icons/ri';
import { formatTime } from '../utils/TimeFormatter';
import TagList from './TagList';
import Stars from './ui/Stars';
import { useUserContext } from '../context/UserContext';
import { useThreadContext } from '../context/ThreadContext';

const ThreadCard = ({ id, tags, title, body, author, authorId, timestamp, gold, silver, bronze, short }) => {
    const { user } = useUserContext();
    const { deleteThread } = useThreadContext();
    const navigate = useNavigate();

    function handleDeleteThread() {
        deleteThread(id)
            .then(() => navigate('/home'))
            .catch(err => alert('Error deleting thread: ' + err));
    }

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
                {!short && authorId === user?.id && (
                    <div className='flex gap-2 items-center text-xs mt-3'>
                        <button className='flex gap-2 items-center hover:text-primary'>
                            Edit
                            <RiEdit2Line />
                        </button>
                        <button onClick={handleDeleteThread} className='flex gap-2 items-center hover:text-red-500'>
                            Delete
                            <FiTrash />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreadCard;
