import React, { useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import TagPicker from './TagPicker';

const EditTags = ({ onChange = () => null, setTags: setParentTags, tags: parentTags }) => {
    const [isEditingTags, setIsEditingTags] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsEditingTags(prev => !prev)}
                className='border text-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors border-primary aspect-square w-7 flex items-center justify-center rounded'
            >
                <RiPencilFill size={20} />
            </button>
            {isEditingTags && (
                <TagPicker
                    tags={parentTags}
                    closePopup={tags => {
                        onChange(tags.map(tag => tag.id));
                        setParentTags(tags);
                        setIsEditingTags(false);
                    }}
                />
            )}
        </>
    );
};

export default EditTags;
