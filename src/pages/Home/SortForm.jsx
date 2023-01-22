import React, { useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';

const SortForm = ({ setThreads }) => {
    const [isSelecting, setIsSelecting] = useState(false);

    function handleSelect(type) {
        setThreads(prev => {
            switch (type) {
                case 'High':
                    return prev.sort((a, b) => a.bronze + a.silver + a.gold - (b.bronze + b.silver + b.gold));
                case 'Old to New':
                    return prev.sort((a, b) => a.timestamp - b.timestamp);
                case 'New to Old':
                    return prev.sort((a, b) => b.timestamp - a.timestamp);
                default:
                    return prev;
            }
        });
        setIsSelecting(false);
    }

    return (
        <div className='relative'>
            <button onClick={() => setIsSelecting(prev => !prev)} className='flex items-center gap-1 px-2'>
                <BiSortAlt2 color='gray' size={18} />
                <p className='text-xs text-gray-400'>Sort</p>
            </button>
            {isSelecting && (
                <div className='absolute right-0 top-full mt-4 shadow-md text-xs bg-white w-fit flex flex-col rounded-lg border border-primary overflow-hidden z-50'>
                    <button onClick={() => handleSelect('High')} className='whitespace-nowrap px-7 py-2 hover:bg-gray-200 transition-colors'>
                        Top Rated
                    </button>
                    <button onClick={() => handleSelect('Old to New')} className='whitespace-nowrap px-7 py-2 hover:bg-gray-200 transition-colors'>
                        Oldest - Newest
                    </button>
                    <button onClick={() => handleSelect('New to Old')} className='whitespace-nowrap px-7 py-2 hover:bg-gray-200 transition-colors'>
                        Newest - Oldest
                    </button>
                </div>
            )}
        </div>
    );
};

export default SortForm;
