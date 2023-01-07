import React from 'react';
import UserIcon from './UserIcon';
import defaultIcon from '../assets/user-icon.svg';

const OverlayWrapper = ({ children, title, iconUrl, action, activeOverlay }) => {
    return (
        <div
            className='w-64 rounded-t-lg overflow-hidden bg-background border border-b-0 border-primary h-80 flex flex-col transition-transform duration-300'
            style={{ transform: activeOverlay ? 'translateY(0)' : 'translateY(276px)' }}
        >
            <div className='flex items-center gap-2 py-[4px] px-2 bg-primary text-white font-bold'>
                <UserIcon src={iconUrl ?? defaultIcon} width='35px' />
                <h2 className='grow font-medium text-sm'>{title}</h2>
                {action}
            </div>

            {children}
        </div>
    );
};

export default OverlayWrapper;
