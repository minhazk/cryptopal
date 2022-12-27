import React, { useState } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { HiOutlineReply } from 'react-icons/hi';
import { FiTrash } from 'react-icons/fi';
import { formatTime } from '../../utils/TimeFormatter';
import Stars from '../../components/ui/Stars';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const Comment = ({ id, author, timestamp, body, gold, silver, bronze, childComments }) => {
    // const childComments = 'CALLA  FUNCTOIN HERE TO GET CHILD COMMENTS, FOR NOW ILL PASS THEM IN PROPS TO PREVENT INFINTEI LOOP';
    const [replying, setReplying] = useState(false);

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
                        <span className='text-accent font-semibold text-xs'>{author}</span>
                        <span className='text-gray-300 font-light text-[11px] ml-2'>{formatTime(timestamp)}</span>
                    </p>
                    <p className='text-xs mt-1 mb-3'>{body}</p>
                    <div className='flex items-center gap-4'>
                        <Stars num={gold} tier='gold' />
                        <Stars num={silver} tier='silver' />
                        <Stars num={bronze} tier='bronze' />
                        <div className='ml-auto mr-2 flex gap-2 items-center'>
                            <button onClick={() => {}} className='hover:text-red-500 focus:text-red-500 p-1 rounded-full'>
                                <FiTrash />
                            </button>
                            <button onClick={() => setReplying(prev => !prev)} className='hover:shadow-md focus:shadow-md hover:text-primary p-1 rounded-full'>
                                <HiOutlineReply size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {replying && (
                <div className='mt-4'>
                    <CommentForm autoFocus setReplying={setReplying} />
                </div>
            )}

            {childComments.length > 0 && (
                <div className='flex mt-3'>
                    <div className='w-8 sm:w87 relative before:absolute before:bg-slate-300 before:h-[95%] before:top-[2.5%] before:w-px before:left-1/2 before:-translate-x-1/2'></div>
                    <div className='flex flex-col gap-3 w-full'>
                        <CommentList comments={childComments} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
