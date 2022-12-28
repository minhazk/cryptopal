import React from 'react';
import { HiOutlineChevronUp } from 'react-icons/hi';
import UserIcon from './UserIcon';

const OverlayWrapper = ({ children, title, iconUrl }) => {
    return (
        <div className='w-64 rounded-t-lg overflow-hidden bg-background border border-b-0 border-primary h-80 flex flex-col z-50'>
            <div className='flex items-center gap-2 py-[4px] px-2 bg-primary text-white font-bold'>
                <UserIcon src={iconUrl} width='35px' />
                <h2 className='grow font-medium text-sm'>{title}</h2>
                <button>
                    <HiOutlineChevronUp size={25} />
                </button>
            </div>

            {children}
        </div>
    );
};

export default OverlayWrapper;
