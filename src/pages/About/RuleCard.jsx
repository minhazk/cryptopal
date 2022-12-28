import React from 'react';

const RuleCard = ({ rule }) => {
    const { label, data } = rule;

    return (
        <div className='py-2 px-1 xs:px-3 text-center w-full'>
            <p className='text-primary font-medium text-xs xs:text-sm'>
                {label} <br></br> upvotes
            </p>
            <div className='flex gap-1 xs:gap-2 items-center justify-center text-[10px] xs:text-xs mt-2'>
                <span>+</span>
                <span className='border border-bronze w-5 xs:w-6 flex items-center justify-center rounded aspect-square'>{data[0]}</span>
                <span className='border border-silver w-5 xs:w-6 flex items-center justify-center rounded aspect-square'>{data[1]}</span>
                <span className='border border-gold w-5 xs:w-6 flex items-center justify-center rounded aspect-square'>{data[2]}</span>
            </div>
        </div>
    );
};

export default RuleCard;
