import React from 'react';
import Stars from '../../components/ui/Stars';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';

const AchievementCard = ({ id, imgUrl, bronze, silver, gold, userId }) => {
    return (
        <div className='bg-white rounded w-full aspect-video relative overflow-hidden'>
            <img src={imgUrl} className='object-cover h-full w-full' />

            <div className='absolute top-0 left-0 inset-0 flex flex-col opacity-0 hover:opacity-100 transition-opacity' style={{ backgroundColor: 'rgb(0 0 0 / .45)' }}>
                <div className='flex flex-col gap-1 text-white grow p-4'>
                    <button className='hover:shadow-md focus:shadow-md w-fit'>
                        <HiOutlineChevronUp size={30} />
                    </button>
                    <button className='hover:shadow-md focus:shadow-md w-fit'>
                        <HiOutlineChevronDown size={30} />
                    </button>
                </div>

                <div className='flex items-center justify-center gap-4 pb-5'>
                    <Stars num={gold} tier='gold' white />
                    <Stars num={silver} tier='silver' white />
                    <Stars num={bronze} tier='bronze' white />
                </div>
            </div>
        </div>
    );
};

export default AchievementCard;
