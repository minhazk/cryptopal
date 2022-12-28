import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { tierColours } from '../../utils/colours';

const TierCard = ({ tierNum, tier }) => {
    return (
        <div className='flex flex-col rounded overflow-hidden text-center w-full' style={{ border: `1px solid ${tierColours[tier]}` }}>
            <p className='uppercase text-white tracking-wider text-[10px] sm:text-xs md:text-sm py-1' style={{ backgroundColor: tierColours[tier] }}>
                {tier}
            </p>
            <div className='grow flex items-center justify-center p-2' style={{ color: tierColours[tier] }}>
                <AiFillStar size={'80%'} />
            </div>
            <p className='font-medium pb-2 text-xs'>Tier {tierNum}</p>
        </div>
    );
};

export default TierCard;
