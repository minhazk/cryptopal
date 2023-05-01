import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Page from '../../components/ui/Page';
import TagList from '../../components/TagList';
import AchievementCard from './AchievementCard';
import Carousel from './Carousel';
import RecentCommentCard from './RecentCommentCard';
import StatCard from './StatCard';
import UserIcon from '../../components/UserIcon';
import { useUserContext } from '../../context/UserContext';
import Button from '../../components/ui/Button';
import UploadAchievement from './UploadAchievement';
import EditTags from '../../components/EditTags';

const Profile = () => {
    const { id } = useParams();
    const {
        user: loggedInUser,
        getUserById,
        getUserTags,
        updateUserTags,
        followUser,
        unfollowUser,
        getUserStats,
        isFollowing: isFollowingUser,
        getUserAchievements,
        getUserComments,
    } = useUserContext();
    const [isOwner, setIsOwner] = useState(false);
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(true);
    const [userStats, setUserStats] = useState(null);
    const [recentComments, setRecentComments] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (loggedInUser === null) return;
        setIsOwner(loggedInUser?.id === id);
        isFollowingUser(id).then(setIsFollowing);
    }, [loggedInUser, id]);

    useEffect(() => {
        getUserById(id).then(setUser);
        getUserStats(id).then(setUserStats);
        getUserAchievements(id).then(setAchievements);
        getUserComments(id).then(setRecentComments);
        getUserTags(id).then(setTags);
    }, [id]);

    // useEffect(() => {
    //     getUserById(id).then(setUser);
    //     getUserStats(id).then(setUserStats);
    //     getUserAchievements(id).then(setAchievements);
    //     getUserComments(id).then(setRecentComments);
    //     getUserTags(id).then(setTags);
    // }, [id]);

    useEffect(() => {
        getUserStats(id).then(setUserStats);
    }, [isFollowing]);

    return (
        <Page hideSideProfile>
            <div className='grid grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr] gap-x-4 md:gap-x-4 lg:gap-x-10 items-center'>
                <div className='ml-6 flex flex-col'>
                    <UserIcon src={user?.photoUrl} width={isOwner ? '100px' : '70px'} />
                    {!isOwner &&
                        (!isFollowing ? (
                            <div className='text-xs flex justify-center mt-2'>
                                <Button label='Follow' onClick={() => followUser(id).then(() => setIsFollowing(true))} />
                            </div>
                        ) : (
                            <div className='text-xs flex justify-center mt-2'>
                                <Button label='Unfollow' onClick={() => unfollowUser(id).then(() => setIsFollowing(false))} />
                            </div>
                        ))}
                </div>
                <div className='flex flex-col gap-3 py-2 px-4'>
                    <p className='text-lg text-primary font-semibold'>{user?.displayName}</p>
                    <Link
                        to='/about'
                        className='bg-[#E0DBF6] text-accent w-fit font-semibold text-xs rounded-full py-[6px] px-3 transition-colors hover:bg-accent focus:bg-accent hover:text-white focus:text-white'
                    >
                        {user?.points ?? 0} point{user?.points > 1 && 's'}
                    </Link>
                </div>
                <div className='col-span-2 md:col-span-1 flex mt-5 md:mt-0 divide-x divide-gray-200 rounded-md shadow-md bg-white w-full mx-auto md:max-w-[450px]'>
                    <StatCard label='Threads' num={userStats?.threads ?? 0} />
                    <StatCard label='Following' num={userStats?.following ?? 0} />
                    <StatCard label='Followers' num={userStats?.followers ?? 0} />
                </div>
            </div>

            <h2 className='mt-8 mb-3 font-medium lg:text-md'>Topics of interest</h2>
            <div className='flex gap-2 items-center'>
                {tags.length === 0 ? <p className='text-sm'>No categories selected</p> : <TagList tags={tags} />}
                {isOwner && <EditTags onChange={updateUserTags} setTags={setTags} tags={tags} />}
            </div>

            <h2 className='mt-8 font-medium lg:text-md'>Recent Activity</h2>
            {recentComments.length === 0 ? (
                <div className='flex items-center justify-center text-sm text-gray-400 h-16 mb-6'>
                    <p>This has user has not interacted with any threads yet</p>
                </div>
            ) : (
                <Carousel
                    cards={recentComments.map(comment => (
                        <RecentCommentCard key={comment.id} {...comment} />
                    ))}
                    size={recentComments.length}
                />
            )}

            <h2 className='font-medium lg:text-md'>Achievements</h2>
            {achievements.length === 0 && !isOwner ? (
                <div className='flex items-center justify-center text-sm text-gray-400 h-16'>
                    <p>This has user has not posted any achievements yet</p>
                </div>
            ) : (
                <Carousel
                    cards={[
                        ...achievements.map(achievement => <AchievementCard key={achievement.id} {...achievement} />),
                        isOwner ? <UploadAchievement key={-Infinity} setAchievements={setAchievements} /> : null,
                    ]}
                    size={achievements.length + 1}
                />
            )}
        </Page>
    );
};

export default Profile;
