import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { useThreadContext } from '../../context/ThreadContext';

const CommentForm = ({ autoFocus = false, setReplying, parentThreadId, parentCommentId = null, setComments }) => {
    const [value, setValue] = useState('');

    const [focused, setFocused] = useState('');
    const { createComment } = useThreadContext();

    const handleCreateComment = () => {
        createComment(value, parentThreadId, parentCommentId)
            .then(() => setValue(''))
            .catch(err => alert('There was an error posting your comment: ' + err));
    };

    return (
        <form onSubmit={e => e.preventDefault()} className='m-0'>
            <textarea
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onChange={e => setValue(e.target.value)}
                value={value}
                autoFocus={autoFocus}
                placeholder='Add a reply'
                className='w-full resize-x-none h-16 max-h-16 shadow-sm text-xs py-2 px-3 rounded outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary'
                required
            ></textarea>
            {(value || focused) && (
                <div className='flex justify-end gap-2'>
                    <button
                        onClick={() => {
                            setValue('');
                            if (setReplying) setReplying(false);
                        }}
                        className='bg-gray-300 text-sm py-1 px-3 rounded'
                    >
                        Cancel
                    </button>
                    <Button type='submit' label='Post' onClick={handleCreateComment} />
                </div>
            )}
        </form>
    );
};

export default CommentForm;
