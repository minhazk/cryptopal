import React from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Stars from '../../components/ui/Stars';

const RecentCommentCard = ({ id, body, bronze, silver, gold, parentId }) => {
    const threadTitle = 'Thread title'; // call function to get title from parentId passed as prop

    return (
        <div className='bg-white rounded py-5 px-4 flex flex-col gap-2 shadow'>
            <Link to={`/thread/${parentId}`} className='text-[12px] font-semibold'>
                {threadTitle}
            </Link>

            <div className='flex items-center gap-3 mb-1'>
                <div>{<BsArrowReturnRight />}</div>
                <Link
                    to={`/thread/${parentId}`}
                    className='text-xs text-primary hover:underline focus:underline text-ellipsis overflow-hidden'
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
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
