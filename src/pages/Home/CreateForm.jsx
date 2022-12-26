import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import Button from '../../components/ui/Button';
import TagList from '../../components/ui/TagList';

const CreateForm = () => {
    const [tags, setTags] = useState([]);

    return (
        <div>
            <div className='bg-white shadow-sm shadow-gray-200 rounded relative'>
                <input
                    className='w-full text-sm py-2 px-3 rounded outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary'
                    placeholder='Ask something'
                />
                <button className='absolute right-2 top-1/2 -translate-y-1/2'>
                    <AiOutlinePlus size={25} />
                </button>
            </div>

            <div className='bg-white p-3 shadow-sm shadow-gray-200 rounded mt-3'>
                <textarea
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
                    <div className='ml-auto'>
                        <Button onClick={() => {}} label='Post'>
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateForm;
