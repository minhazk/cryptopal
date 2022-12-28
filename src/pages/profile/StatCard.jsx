import React from 'react';

const StatCard = ({ label, num }) => {
    return (
        <div className='py-2 px-1 xs:px-3 text-center w-full flex flex-col gap-2'>
            <p className='text-primary font-semibold text-xs'>{label}</p>
            <p className='font-bold'>{num}</p>
        </div>
    );
};

export default StatCard;
