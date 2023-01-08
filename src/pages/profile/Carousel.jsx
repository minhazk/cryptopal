import React, { useState } from 'react';
import { colours } from '../../utils/colours';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Carousel = ({ cards, options }) => {
    const OPTIONS = {
        gap: '1em',
        cardsPerSlide: 2,
        ...options,
    };

    const [xOffset, setXOffset] = useState(0);
    const [numOfSlides, setNumOfSlides] = useState(Math.ceil(cards.length / OPTIONS.cardsPerSlide)); // in case screen size changes

    const handleNextPage = () => {
        if (Math.abs(xOffset) === OPTIONS.cardsPerSlide) return;
        setXOffset(prev => prev - 1);
    };

    const handlePrevPage = () => {
        if (xOffset === 0) return;
        setXOffset(prev => prev + 1);
    };

    return (
        <div className='overflow-x-hidden my-2 py-2 w-full max-w-[920px]'>
            <div
                className='grid grid-flow-col transition-transform'
                style={{
                    gridGap: OPTIONS.gap,
                    gridAutoColumns: `calc(100% / ${OPTIONS.cardsPerSlide} - (${OPTIONS.gap} - ${OPTIONS.gap} / ${OPTIONS.cardsPerSlide}))`,
                    transform: `translateX(calc(${xOffset} * 100% - (${xOffset} * ${OPTIONS.gap} * -1)))`,
                }}
            >
                {cards}
            </div>
            <div className='flex items-center justify-center gap-2 my-4 text-primary'>
                <button onClick={handlePrevPage} className='hover:shadow-md'>
                    <HiOutlineChevronLeft size={20} />
                </button>
                {Array.from({ length: numOfSlides }).map((_n, i) => (
                    <PageDot key={i} active={-xOffset === i} setXOffset={setXOffset} pageNum={i} />
                ))}
                <button onClick={handleNextPage} className='hover:shadow-md'>
                    <HiOutlineChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

function PageDot({ active, setXOffset, pageNum }) {
    return (
        <button
            onClick={() => setXOffset(-pageNum)}
            className='w-2 aspect-square rounded-full border border-primary transition-colors relative before:absolute before:top-0 before:left-0 before:inset-0 before:hover:bg-indigo-300'
            style={{ backgroundColor: active ? colours.primary : 'transparent' }}
        ></button>
    );
}

export default Carousel;
