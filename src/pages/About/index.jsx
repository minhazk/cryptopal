import React from 'react';
import Page from '../../components/ui/Page';
import Stars from '../../components/ui/Stars';
import { AiFillStar } from 'react-icons/ai';
import { tierColours } from '../../utils/colours';

const votingRules = [
    {
        label: 'Thread',
        data: [1, 2, 3],
    },
    {
        label: 'Comment',
        data: [2, 3, 4],
    },
    {
        label: 'Achievement',
        data: [3, 5, 8],
    },
];

const silverThreshold = 500;
const goldThreshold = 1000;

const About = () => {
    const userPoints = 120;

    return (
        <Page>
            <h1 className='text-primary text-lg font-medium'>Ranking Information</h1>
            <p className='my-3 text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar etiam non quam lacus suspendisse
                faucibus. Elementum eu facilisis sed odio morbi quis commodo odio. Felis bibendum ut tristique et egestas.
            </p>

            <div className='flex my-8 divide-x divide-gray-200 rounded-md shadow-md bg-white sm:max-w-[85%] md:max-w-[600px] mx-auto'>
                <RuleCard rule={votingRules[0]} />
                <RuleCard rule={votingRules[1]} />
                <RuleCard rule={votingRules[2]} />
            </div>

            <div className='mt-20 max-w-[80%] mx-auto relative'>
                <div className='flex flex-col items-center w-fit -translate-x-1/2 translate-y-px absolute bottom-full' style={{ left: `calc(${(userPoints / 1000) * 100} * 1%)` }}>
                    <div className='text-white bg-accent w-fit text-xs rounded py-1 px-2 whitespace-nowrap'>You are here</div>
                    <div className='h-4 w-px bg-accent'></div>
                </div>
                <div className='bg-gray-300 w-full h-px'></div>
                <div className='flex justify-between gap-2 mt-3 px-2'>
                    <Stars num={0} tier='bronze' />
                    <Stars num={500} tier='silver' />
                    <Stars num={1000} tier='gold' />
                </div>
            </div>

            <h2 className='text-sm mt-7 font-semibold text-center'>Your rank</h2>
            <div className='flex gap-2 md:gap-4 mt-5 mx-auto sm:max-w-[90%] lg:max-w-[550px]'>
                <TierCard tierNum={1} tier='bronze' />
                {userPoints < silverThreshold && (
                    <div className='w-full flex flex-col justify-center gap-2'>
                        <p className='text-center text-xs text-primary font-semibold'>+{silverThreshold - userPoints} points</p>
                        <div className='w-full h-px bg-gray-400' />
                    </div>
                )}
                <TierCard tierNum={2} tier='silver' />
                {userPoints >= silverThreshold && (
                    <div className='w-full flex flex-col justify-center gap-2'>
                        <p className='text-center text-xs text-primary font-semibold'>+{goldThreshold - userPoints} points</p>
                        <div className='w-full h-px bg-gray-400' />
                    </div>
                )}
                <TierCard tierNum={3} tier='gold' />
            </div>
        </Page>
    );
};

function TierCard({ tierNum, tier }) {
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
}

function RuleCard({ rule }) {
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
}

export default About;
