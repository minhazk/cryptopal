import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineChevronUp, HiOutlineChevronDown, HiOutlineReply } from 'react-icons/hi';
import { FiTrash } from 'react-icons/fi';
import { RiEdit2Line } from 'react-icons/ri';
import { formatTime } from '../../utils/TimeFormatter';
import Stars from '../../components/ui/Stars';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useThreadContext } from '../../context/ThreadContext';
import { useUserContext } from '../../context/UserContext';

const Comment = ({ id, authorId, timestamp, body, gold, silver, bronze, parentThreadId, groupedComments, setComments }) => {
    const [replying, setReplying] = useState(false);
    const { user } = useUserContext();
    const { getAuthor } = useThreadContext();
    const [author, setAuthor] = useState(null);
    const childComments = groupedComments[id];

    useEffect(() => {
        (async () => setAuthor((await getAuthor(authorId)).author))();
    }, [author]);

    return (
        <div>
            <div className='bg-white rounded shadow-sm px-3 py-4 pr-5 flex gap-3'>
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

                <div className='w-full'>
                    <p>
                        <Link to={`/profile/${authorId}`} className='text-accent hover:underline font-semibold text-xs'>
                            {author}
                        </Link>
                        <span className='text-gray-300 font-light text-[11px] ml-2'>{formatTime(timestamp)}</span>
                    </p>
                    <p className='text-xs mt-1 mb-3'>{body}</p>
                    <div className='flex items-center gap-4'>
                        <Stars num={gold} tier='gold' />
                        <Stars num={silver} tier='silver' />
                        <Stars num={bronze} tier='bronze' />
                    </div>
                    <div className='mt-1 flex gap-3 items-center text-xs'>
                        <button onClick={() => setReplying(prev => !prev)} className='flex items-center gap-2 hover:text-primary py-1 rounded-full'>
                            Reply
                            <HiOutlineReply size={12} />
                        </button>
                        {user?.id === authorId && (
                            <>
                                <button onClick={() => setReplying(prev => !prev)} className='flex items-center gap-2 hover:text-primary py-1 rounded-full'>
                                    Edit
                                    <RiEdit2Line size={14} />
                                </button>
                                <button onClick={() => {}} className='flex items-center gap-2 hover:text-red-500 focus:text-red-500 py-1 rounded-full'>
                                    Delete
                                    <FiTrash size={12} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {replying && (
                <div className='mt-4'>
                    <CommentForm autoFocus setReplying={setReplying} parentThreadId={parentThreadId} parentCommentId={id} setComments={setComments} />
                </div>
            )}

            {childComments != undefined && childComments.length > 0 && (
                <div className='flex mt-3'>
                    <div className='w-8 sm:w87 relative before:absolute before:bg-slate-300 before:h-[95%] before:top-[2.5%] before:w-px before:left-1/2 before:-translate-x-1/2'></div>
                    <div className='flex flex-col gap-3 w-full'>
                        <CommentList comments={childComments} groupedComments={groupedComments} setComments={setComments} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
