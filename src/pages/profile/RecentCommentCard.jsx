import React from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Stars from '../../components/ui/Stars';

const RecentCommentCard = ({ body, parentThreadId, bronze, silver, gold, parentThreadTitle }) => {
    return (
        <div className='bg-white rounded py-5 px-4 flex flex-col gap-2 shadow'>
            <p className='text-[12px] font-semibold'>{parentThreadTitle}</p>

            <div className='flex items-center gap-3 mb-1'>
                <div>{<BsArrowReturnRight />}</div>
                <Link
                    to={`/thread/${parentThreadId}`}
                    className='text-xs text-primary hover:underline focus:underline text-ellipssis overflow-hiddsen'
                    // style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                >
                    {body}
                </Link>
            </div>

            <div className='flex items-center justify-center gap-4 w-fit'>
                <Stars num={gold} tier='gold' />
                <Stars num={silver} tier='silver' />
                <Stars num={bronze} tier='bronze' />
            </div>
        </div>
    );
};

export default RecentCommentCard;
