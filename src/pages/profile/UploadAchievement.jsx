import React, { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useUserContext } from '../../context/UserContext';

const UploadAchievement = () => {
    const { createAchievement } = useUserContext();
    const inputRef = useRef();

    const handleUpload = e => {
        const files = e.target.files;
        if (files.length === 0) return;
        const image = files[0];
        createAchievement(image);
    };

    return (
        <button
            onClick={() => inputRef.current.click()}
            className='border border-primary text-primary flex items-center justify-center rounded hover:opacity-60 transition-opacity aspect-video w-full'
        >
            <AiOutlinePlus size={65} />
            <input onChange={handleUpload} ref={inputRef} type='file' className='appearance-none hidden' accept='image/*' />
        </button>
    );
};

export default UploadAchievement;
