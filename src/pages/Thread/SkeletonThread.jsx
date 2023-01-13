import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonThread = () => {
    return (
        <div className='bg-white rounded shadow px-3 py-4 flex gap-3'>
            <div className='flex flex-col gap-1 items-center pt-1'>
                <div className='w-6'>
                    <Skeleton />
                </div>
                <div className='w-6'>
                    <Skeleton />
                </div>
            </div>

            <div className='w-full'>
                <div className='flex gap-2 mb-3'>
                    <div className='w-10'>
                        <Skeleton />
                    </div>
                    <div className='w-10'>
                        <Skeleton />
                    </div>
                    <div className='w-10'>
                        <Skeleton />
                    </div>
                </div>
                <h3 className='text-primary font-semibold text-lg mb-2 w-5/6'>
                    <Skeleton />
                </h3>

                <div className='w-full mr-2'>
                    <Skeleton count={2} />
                    <div className='w-3/4'>
                        <Skeleton />
                    </div>
                </div>

                <p className='my-3 text-xs flex items-center gap-2'>
                    <span className='w-16'>
                        <Skeleton />
                    </span>
                    <span className='w-16'>
                        <Skeleton />
                    </span>
                </p>
                <div className='flex items-center gap-4 my-1'>
                    <div className='w-10'>
                        <Skeleton />
                    </div>
                    <div className='w-10'>
                        <Skeleton />
                    </div>
                    <div className='w-10'>
                        <Skeleton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonThread;
