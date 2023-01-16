import React from 'react';
import defaultIcon from '../assets/user-icon.svg';

const UserIcon = ({ src, width = '112px' }) => {
    console.log(src);
    return (
        <div className='rounded-full aspect-square overflow-hidden' style={{ width }}>
            <img className='w-full h-full object-cover' src={src ?? defaultIcon} alt='profile picture' />
        </div>
    );
};

export default UserIcon;
