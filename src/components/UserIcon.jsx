import React from 'react';

const UserIcon = ({ src, width = '112px' }) => {
    return (
        <div className='rounded-full aspect-square overflow-hidden' style={{ width }}>
            <img className='w-full h-full object-cover' src={src} alt='profile picture' />
        </div>
    );
};

export default UserIcon;
