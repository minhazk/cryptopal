import React, { useEffect, useRef, useState } from 'react';
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
import { tierColours } from '../../utils/colours';

const Comment = ({ id, authorId, timestamp, body, gold, silver, bronze, parentThreadId, groupedComments, setComments }) => {
    const [replying, setReplying] = useState(false);
    const [editingComment, setEditingComment] = useState(false);
    const [vote, setVote] = useState(null);
    const { user } = useUserContext();
    const { getAuthor, deleteComment, handleVote, updatePost, getUserVote } = useThreadContext();
    const [author, setAuthor] = useState(null);
    const childComments = groupedComments[id];

    const bodyRef = useRef();

    useEffect(() => {
        getAuthor(authorId).then(authorData => setAuthor(authorData.author));
        getUserVote(id, 'comment').then(setVote);
    }, [author]);

    function handleDeleteComment() {
        deleteComment(id).then(id => setComments(prev => prev.filter(comment => comment.id != id)));
    }

    function handleCommentVote(variation) {
        handleVote(id, 'comment', variation, authorId).then(({ postId, userRank, alteration, vote }) => {
            setComments(prev =>
                prev.map(comment => {
                    if (comment.id !== postId) return comment;
                    comment[userRank] = alteration;
                    comment.vote = vote;
                    return comment;
                })
            );
            setVote(vote);
        });
    }

    function handleUpdateComment() {
        updatePost(id, 'comment', bodyRef.current.value)
            .then(({ id, body }) => {
                setComments(prev =>
                    prev.map(comment => {
                        if (comment.id !== id) return comment;
                        comment.body = body;
                        return comment;
                    })
                );
                setEditingComment(false);
            })
            .catch(err => alert('Error editing comment: ' + err));
    }

    return (
        <div>
            <div className='bg-white rounded shadow-sm px-3 py-4 pr-5 flex gap-3'>
                <div className='flex flex-col items-center pt-2'>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCommentVote('upvote');
                        }}
                        className='hover:shadow-sm z-10'
                    >
                        <HiOutlineChevronUp size={22} color={vote === 'upvote' ? tierColours.gold : 'black'} />
                    </button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCommentVote('downvote');
                        }}
                        className='hover:shadow-sm'
                    >
                        <HiOutlineChevronDown size={22} color={vote === 'downvote' ? tierColours.gold : 'black'} />
                    </button>
                </div>

                <div className='w-full'>
                    <p>
                        <Link to={`/profile/${authorId}`} className='text-accent hover:underline font-semibold text-xs'>
                            {author}
                        </Link>
                        <span className='text-gray-300 font-light text-[11px] ml-2'>{formatTime(timestamp)}</span>
                    </p>
                    {!editingComment ? (
                        <p className='w-full max-h-12 text-xs mt-1 mb-3'>{body}</p>
                    ) : (
                        <textarea
                            ref={bodyRef}
                            autoFocus
                            className='w-full max-h-12 resize-none text-xs mt-1 mb-3 border rounded outline-none transition-all duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary disabled:bg-transparent py-1 px-2'
                        >
                            {body}
                        </textarea>
                    )}
                    <div className='flex items-center gap-4'>
                        <Stars num={gold} tier='gold' />
                        <Stars num={silver} tier='silver' />
                        <Stars num={bronze} tier='bronze' />
                    </div>
                    {!editingComment ? (
                        <div className='mt-2 flex gap-3 items-center text-xs'>
                            <button onClick={() => setReplying(prev => !prev)} className='flex items-center gap-2 hover:text-primary py-1 rounded-full'>
                                Reply
                                <HiOutlineReply size={12} />
                            </button>

                            {user?.id === authorId && (
                                <>
                                    <button onClick={() => setEditingComment(true)} className='flex items-center gap-2 hover:text-primary py-1 rounded-full'>
                                        Edit
                                        <RiEdit2Line size={14} />
                                    </button>
                                    <button onClick={handleDeleteComment} className='flex items-center gap-2 hover:text-red-500 focus:text-red-500 py-1 rounded-full'>
                                        Delete
                                        <FiTrash size={12} />
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className='mt-3 flex gap-3 items-center text-[12px]'>
                            <button onClick={handleUpdateComment} className='bg-primary text-white py-1 px-3 rounded'>
                                Save changes
                            </button>
                            <button onClick={() => setEditingComment(false)} className='bg-gray-300 py-1 px-3 rounded'>
                                Cancel
                            </button>
                        </div>
                    )}
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
