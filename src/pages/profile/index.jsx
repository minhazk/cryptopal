import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../components/ui/Page';
import TagList from '../../components/TagList';
import AchievementCard from './AchievementCard';
import Carousel from './Carousel';
import RecentCommentCard from './RecentCommentCard';
import StatCard from './StatCard';
import { RiPencilFill } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import UserIcon from '../../components/UserIcon';
import TagPicker from '../../components/TagPicker';
import { useUserContext } from '../../context/UserContext';

const Profile = () => {
    const { user, userTags, updateUserTags } = useUserContext();

    const dummyTags = [
        { id: 1123, label: 'ADA', color: '#C339BE' },
        { id: 2213, label: 'ETH', color: '#28A1C7' },
        { id: 3123, label: 'USDT', color: '#775BE9' },
        { id: 4123, label: 'BTC', color: '#FF7979' },
    ];
    const recentComments = [
        {
            id: 123123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ipsum sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing ',
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
        {
            id: 2312,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
        {
            id: 323123,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ipsum sit amet',
            bronze: 2,
            silver: 7,
            gold: 11,
            parentId: 12,
        },
        // {
        //     id: 4123,
        //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        //     bronze: 2,
        //     silver: 7,
        //     gold: 11,
        //     parentId: 12,
        // },
        // {
        //     id: 523,
        //     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        //     bronze: 2,
        //     silver: 7,
        //     gold: 11,
        //     parentId: 12,
        // },
    ];

    const achievements = [
        {
            id: 12321,
            imgUrl: 'https://source.unsplash.com/random/1',
            bronze: 3,
            silver: 1,
            gold: 2,
            userId: 12,
        },
        {
            id: 2312,
            imgUrl: 'https://source.unsplash.com/random/2',
            bronze: 3,
            silver: 1,
            gold: 2,
            userId: 12,
        },
        {
            id: 3123,
            imgUrl: 'https://source.unsplash.com/random/3',
            bronze: 3,
            silver: 1,
            gold: 2,
            userId: 12,
        },
    ];
    const [tags, setTags] = useState(userTags);
    const [isEditingTags, setIsEditingTags] = useState(false);

    useEffect(() => {
        updateUserTags(tags);
    }, [tags]);

    console.log(userTags);

    useEffect(() => {
        console.log(userTags);
        setTags(userTags);
    }, []);

    return (
        <Page hideSideProfile>
            <div className='grid grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr] gap-x-4 md:gap-x-4 lg:gap-x-10 items-center'>
                <div className='ml-6'>
                    <UserIcon src={user?.photoUrl} width='100px' />
                </div>
                <div className='flex flex-col gap-3 py-2 px-4'>
                    <p to={`/profile/${1}`} className='text-lg text-primary font-semibold hover:underline focus:underline'>
                        {user?.displayName}
                    </p>
                    <Link
                        to='/about'
                        className='bg-[#E0DBF6] text-accent w-fit font-semibold text-xs rounded-full py-[6px] px-3 transition-colors hover:bg-accent focus:bg-accent hover:text-white focus:text-white'
                    >
                        120 points
                    </Link>
                </div>
                <div className='col-span-2 md:col-span-1 flex mt-5 md:mt-0 divide-x divide-gray-200 rounded-md shadow-md bg-white w-full mx-auto md:max-w-[450px]'>
                    <StatCard label='Threads' num={0} />
                    <StatCard label='Following' num={0} />
                    <StatCard label='Followers' num={0} />
                </div>
            </div>

            <h2 className='mt-8 mb-3 font-medium lg:text-md'>Topics of interest</h2>
            <div className='flex gap-2 items-center'>
                {userTags.length === 0 ? <p className='text-sm'>No categories selected</p> : <TagList tags={userTags} />}
                <button
                    onClick={() => setIsEditingTags(prev => !prev)}
                    className='border text-primary hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-colors border-primary aspect-square w-7 flex items-center justify-center rounded'
                >
                    <RiPencilFill size={20} />
                </button>
                {isEditingTags && <TagPicker tags={tags} setTags={setTags} closePopup={() => setIsEditingTags(false)} />}
            </div>

            <h2 className='mt-8 font-medium lg:text-md'>Recent Activity</h2>
            <Carousel
                cards={recentComments.map(comment => (
                    <RecentCommentCard key={comment.id} {...comment} />
                ))}
            />

            <h2 className='font-medium lg:text-md'>Achievements</h2>
            <Carousel
                cards={[
                    ...achievements.map(achievement => <AchievementCard key={achievement.id} {...achievement} />),
                    <button key={-Infinity} className='border border-primary text-primary flex items-center justify-center rounded hover:opacity-60 transition-opacity'>
                        <AiOutlinePlus size={65} />
                    </button>,
                ]}
            />
        </Page>
    );
};

export default Profile;
