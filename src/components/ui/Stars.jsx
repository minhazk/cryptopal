import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const Stars = ({ num, tier }) => {
    return (
        <div className={`text-${tier} flex gap-1 items-center`}>
            <AiFillStar />
            <p className='text-black text-xs font-semibold'>{num}</p>
        </div>
    );
};

export default Stars;
