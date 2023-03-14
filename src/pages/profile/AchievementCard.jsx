import React, { useState } from 'react';
import Stars from '../../components/ui/Stars';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import { useThreadContext } from '../../context/ThreadContext';
import { tierColours } from '../../utils/colours';

const AchievementCard = ({ id, imgUrl, bronze, silver, gold, userId }) => {
    const [points, setPoints] = useState({ bronze, silver, gold });
    const { handleVote } = useThreadContext();

    function handleAchievementVote(variation) {
        handleVote(id, 'achievement', variation, userId).then(({ userRank, alteration, vote }) =>
            setPoints(prev => {
                return { ...prev, [userRank]: alteration, vote };
            })
        );
    }

    return (
        <div className='bg-white rounded w-full aspect-video relative overflow-hidden'>
            <img src={imgUrl} className='object-cover h-full w-full' />

            <div className='absolute top-0 left-0 inset-0 flex flex-col opacity-0 hover:opacity-100 transition-opacity' style={{ backgroundColor: 'rgb(0 0 0 / .45)' }}>
                <div className='flex flex-col gap-1 text-white grow p-4'>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAchievementVote('upvote');
                        }}
                        className='hover:shadow-md focus:shadow-md w-fit'
                    >
                        <HiOutlineChevronUp size={30} color={points.vote === 'upvote' ? tierColours.gold : 'white'} />
                    </button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAchievementVote('downvote');
                        }}
                        className='hover:shadow-md focus:shadow-md w-fit'
                    >
                        <HiOutlineChevronDown size={30} color={points.vote === 'downvote' ? tierColours.gold : 'white'} />
                    </button>
                </div>

                <div className='flex items-center justify-center gap-4 pb-5'>
                    <Stars num={points.gold} tier='gold' white />
                    <Stars num={points.silver} tier='silver' white />
                    <Stars num={points.bronze} tier='bronze' white />
                </div>
            </div>
        </div>
    );
};

export default AchievementCard;
