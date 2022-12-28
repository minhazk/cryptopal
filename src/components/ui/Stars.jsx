import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { tierColours } from '../../utils/colours';

const Stars = ({ num, tier, white }) => {
    return (
        <div style={{ color: tierColours[tier] }} className='flex gap-1 items-center'>
            <AiFillStar />
            <p className='text-xs font-semibold' style={{ color: white ? 'white' : 'black' }}>
                {num}
            </p>
        </div>
    );
};

export default Stars;
