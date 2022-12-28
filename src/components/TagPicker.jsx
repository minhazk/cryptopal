import React, { useState } from 'react';
import TagList from './TagList';
import Button from './ui/Button';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import Tag from './ui/Tag';
import { colours } from '../utils/colours';

const TagPicker = ({ selected, setTags, closePopup }) => {
    const databaseTags = [
        { id: 1123, label: 'ADA', color: '#C339BE' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
        { id: 3123, label: 'USDT', color: '#775BE9' },
        { id: 4123, label: 'BTC', color: '#FF7979' },
    ];

    const [available, setAvailable] = useState(databaseTags);

    return (
        <div className='fixed top-0 left-0 inset-0 flex justify-center items-center z-[100]' style={{ backgroundColor: 'rgb(0 0 0 / .5)' }}>
            <div className='py-10 px-10 rounded-lg w-[80%] max-w-[700px] flex flex-col items-center gap-5 text-center bg-white shadow-lg relative'>
                <button onClick={closePopup} className='absolute top-2 right-3 p-1 hover:text-accent'>
                    <MdClose size={20} />
                </button>
                <h2 className='text-lg text-primary font-semibold'>Select topics of interest</h2>
                <div className='flex gap-3 justify-center items-center flex-wrap'>
                    {available.map(tag => (
                        <button className='border rounded-md p-px' style={{ border: selected.some(userTag => userTag.id === tag.id) ? `1px solid ${colours.accent}` : '1px solid transparent' }}>
                            <Tag key={tag.id} {...tag} />
                        </button>
                    ))}
                </div>
                <h2 className='text-primary font-medium'>Current selected</h2>
                <div className='flex gap-2 justify-center items-center flex-wrap'>
                    {selected.map(tag => (
                        <button
                            onClick={() => setTags(prev => prev.filter(t => t.id !== tag.id))}
                            className='border-2 border-transparent hover:border-black rounded-md relative after:absolute after:hidden hover:after:block after:content-["x"] after:top-1 after:right-0 after:-translate-y-1/2 after:translate-x-1/2 after:bg-white after:text-red-700 after:rounded-full after:text-[11px] after:w-4 after:font-extrabold after:border after:border-red-700 after:leading-3 after:p-px'
                        >
                            <Tag key={tag.id} {...tag} />
                        </button>
                    ))}
                    <div className='relative'>
                        <input className='text-xs py-[5px] pl-2 w-24 rounded outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 border-2 border-primary pr-7' />
                        <div className='absolute right-0 top-1/2 -translate-y-1/2 p-1 mr-1'>
                            <BsArrowReturnLeft size={15} />
                        </div>
                    </div>
                </div>
                <Button label='Done' onClick={closePopup} />
            </div>
        </div>
    );
};

export default TagPicker;
