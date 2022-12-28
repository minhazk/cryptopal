import React from 'react';
import Tag from './ui/Tag';

const TagList = ({ tags }) => {
    return (
        <>
            {tags.map(tag => (
                <Tag key={tag.id} {...tag} />
            ))}
        </>
    );
};

export default TagList;
