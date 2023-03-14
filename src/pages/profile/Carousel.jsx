import React, { useEffect, useState } from 'react';
import { colours } from '../../utils/colours';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Carousel = ({ cards, size }) => {
    const [xOffset, setXOffset] = useState(0);
    const [cardsPerSlide, setCardsPerSlide] = useState(2);
    const [options, setOptions] = useState({
        gap: '1em',
        cardsPerSlide: 2,
        numOfSlides: Math.ceil(size / cardsPerSlide),
    });

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth < 500) {
                setCardsPerSlide(1);
            } else setCardsPerSlide(2);
        };
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        setOptions(prev => {
            return { ...prev, numOfSlides: Math.ceil(size / cardsPerSlide) };
        });
    }, [cards]);

    const handleNextPage = () => {
        if (Math.abs(xOffset) === options.cardsPerSlide) return;
        setXOffset(prev => prev - 1);
    };

    const handlePrevPage = () => {
        if (xOffset === 0) return;
        setXOffset(prev => prev + 1);
    };

    return (
        <div className='overflow-x-hidden my-2 py-2 max-w-[93vw] md:max-w-[75vw] lg:max-w-[60vw]' style={{ maxWidth: cardsPerSlide === 1 && '88vw' }}>
            <div
                className='grid grid-flow-col transition-transform'
                style={{
                    gridGap: options.gap,
                    gridAutoColumns: `calc(100% / ${cardsPerSlide} - (${options.gap} - ${options.gap} / ${cardsPerSlide}))`,
                    transform: `translateX(calc(${xOffset} * 100% - (${xOffset} * ${options.gap} * -1)))`,
                }}
            >
                {cards}
            </div>
            <div className='flex items-center justify-center gap-2 my-4 text-primary'>
                <button onClick={handlePrevPage} className='hover:shadow-md'>
                    <HiOutlineChevronLeft size={20} />
                </button>
                {Array.from({ length: options.numOfSlides }).map((_n, i) => (
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
