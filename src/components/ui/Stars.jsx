import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const Stars = ({ num, tier }) => {
    return (
        <div style={{ color: tier === 'gold' ? '#FFB800' : tier === 'silver' ? '#AAAAAA' : '#8D6161' }} className='flex gap-1 items-center'>
            <AiFillStar />
            <p className='text-black text-xs font-semibold'>{num}</p>
        </div>
    );
};

export default Stars;
