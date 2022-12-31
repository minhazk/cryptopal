import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import Button from '../../components/ui/Button';
import TagList from '../../components/TagList';
import { useThreadContext } from '../../context/ThreadContext';

const CreateForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [focused, setFocused] = useState(false);

    const { createThread } = useThreadContext();

    const handleCreateThread = () => {
        createThread(title, body, tags.map(tag => tag.id) || []).then(() => {
            setTitle('');
            setBody('');
            setTags([]);
        });
    };

    return (
        <>
            <div className='bg-white shadow-sm shadow-gray-200 rounded relative'>
                {title && <div className='text-[10px] bg-blue-300 text-primary font-bold w-fit py-[.75px] px-2 rounded absolute left-2 top-1/2 -translate-y-1/2'>title</div>}
                <input
                    onBlur={() => setFocused(false)}
                    onFocus={() => setFocused(true)}
                    id='titleInput'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    className='w-full text-sm py-2 px-3 rounded outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary'
                    style={{ paddingLeft: title ? '48px' : '12px' }}
                    placeholder='Ask something'
                />
                <label htmlFor='titleInput' className='absolute right-2 top-1/2 -translate-y-1/2'>
                    <AiOutlinePlus size={25} />
                </label>
            </div>

            {(title || focused) && (
                <div className='bg-white p-3 shadow-sm shadow-gray-200 rounded mt-3'>
                    <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        className='text-sm w-full resize-x-none h-20 max-h-24 py-2 px-2 border border-gray-200 rounded outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary'
                        placeholder='Type here'
                    ></textarea>

                    <h4 className='font-medium text-sm'>Tags</h4>
                    <div className='flex items-center gap-10 mt-2'>
                        <div className='overflow-x-auto'>
                            <TagList tags={tags} />
                            <button className='border border-primary rounded p-1 pointer'>
                                <MdModeEditOutline size={18} />
                            </button>
                        </div>
                        <div className='ml-auto flex gap-2'>
                            <button
                                onClick={() => {
                                    setValue('');
                                    setTags([]);
                                }}
                                className='bg-gray-300 text-sm py-1 px-3 rounded'
                            >
                                Cancel
                            </button>
                            <Button onClick={handleCreateThread} label='Post'>
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateForm;
