import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { FiTrash } from 'react-icons/fi';
import { RiEdit2Line } from 'react-icons/ri';
import { formatTime } from '../utils/TimeFormatter';
import TagList from './TagList';
import Stars from './ui/Stars';
import { useUserContext } from '../context/UserContext';
import { useThreadContext } from '../context/ThreadContext';
import { tierColours } from '../utils/colours';

const ThreadCard = ({ id, tags, title, body, author, authorId, timestamp, gold, silver, bronze, vote, short }) => {
    const { user } = useUserContext();
    const [editingThread, setEditingThread] = useState(false);
    const [bodyContent, setBodyContent] = useState(body);
    const { deleteThread, handleVote, updatePost } = useThreadContext();
    const [points, setPoints] = useState({ bronze, silver, gold, vote });
    const navigate = useNavigate();

    const bodyRef = useRef();

    function handleDeleteThread() {
        deleteThread(id)
            .then(() => navigate('/home'))
            .catch(err => alert('Error deleting thread: ' + err));
    }

    function handleThreadVote(variation) {
        handleVote(id, 'thread', variation, authorId).then(({ userRank, alteration, vote }) =>
            setPoints(prev => {
                return {
                    ...prev,
                    [userRank]: alteration,
                    vote,
                };
            })
        );
    }

    function handleUpdateThread() {
        updatePost(id, 'thread', bodyRef.current.value)
            .then(({ body }) => {
                setBodyContent(body);
                setEditingThread(false);
            })
            .catch(err => alert('Error updating thread: ' + err));
    }

    return (
        <div className='bg-white rounded shadow px-3 py-4 flex gap-3'>
            <div className='flex flex-col gap-1 items-center pt-1'>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleThreadVote('upvote');
                    }}
                    className='hover:shadow-md'
                >
                    <HiOutlineChevronUp size={25} color={points.vote === 'upvote' ? tierColours.gold : 'black'} />
                </button>
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleThreadVote('downvote');
                    }}
                    className='hover:shadow-md'
                >
                    <HiOutlineChevronDown size={25} color={points.vote === 'downvote' ? tierColours.gold : 'black'} />
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
                ) : !editingThread ? (
                    <p className='w-full text-xs mr-2'>{bodyContent}</p>
                ) : (
                    <textarea
                        ref={bodyRef}
                        autoFocus
                        className='w-full max-h-12 resize-none text-xs mt-1 border rounded outline-none transition-all duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary disabled:bg-transparent py-1 px-2'
                    >
                        {bodyContent}
                    </textarea>
                )}
                <p className='my-2'>
                    <Link to={`/profile/${authorId}`} onClick={e => e.stopPropagation()} className='text-accent font-semibold hover:underline text-xs'>
                        {author}
                    </Link>
                    <span className='text-gray-400 font-light text-[11px] ml-2'>{formatTime(timestamp)}</span>
                </p>
                <div className='flex items-center gap-4'>
                    <Stars num={points.gold} tier='gold' />
                    <Stars num={points.silver} tier='silver' />
                    <Stars num={points.bronze} tier='bronze' />
                </div>
                {!editingThread ? (
                    !short &&
                    authorId === user?.id && (
                        <div className='flex gap-3 items-center text-xs mt-3'>
                            <button onClick={() => setEditingThread(true)} className='flex gap-2 items-center hover:text-primary'>
                                Edit
                                <RiEdit2Line />
                            </button>
                            <button onClick={handleDeleteThread} className='flex gap-2 items-center hover:text-red-500'>
                                Delete
                                <FiTrash />
                            </button>
                        </div>
                    )
                ) : (
                    <div className='mt-3 flex gap-3 items-center text-[12px]'>
                        <button onClick={handleUpdateThread} className='bg-primary text-white py-1 px-3 rounded'>
                            Save changes
                        </button>
                        <button onClick={() => setEditingThread(false)} className='bg-gray-300 py-1 px-3 rounded'>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreadCard;
