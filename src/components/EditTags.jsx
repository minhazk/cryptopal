import React, { useEffect, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import TagPicker from './TagPicker';

const EditTags = ({ onChange }) => {
    const [tags, setTags] = useState([]);
    const [isEditingTags, setIsEditingTags] = useState(false);

    useEffect(() => {
        onChange(tags);
    }, [tags]);

    return (
        <>
            <button
                onClick={() => setIsEditingTags(prev => !prev)}
                className='border text-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors border-primary aspect-square w-7 flex items-center justify-center rounded'
            >
                <RiPencilFill size={20} />
            </button>
            {isEditingTags && <TagPicker tags={tags} setTags={setTags} closePopup={() => setIsEditingTags(false)} />}
        </>
    );
};

export default EditTags;
