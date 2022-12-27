import React, { useState } from 'react';
import Button from '../../components/ui/Button';

const CommentForm = ({ autoFocus = false, setReplying, setComments }) => {
    const [value, setValue] = useState('');

    return (
        <>
            <textarea
                onChange={e => setValue(e.target.value)}
                value={value}
                autoFocus={autoFocus}
                placeholder='Add a reply'
                className='w-full resize-x-none h-16 max-h-16 shadow-sm text-xs py-2 px-3 rounded outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary'
            ></textarea>
            {value && (
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
                    <Button label='Post' />
                </div>
            )}
        </>
    );
};

export default CommentForm;
