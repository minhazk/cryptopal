import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';

function useMessaging() {
    const { user, getFollowers } = useUserContext();
    const [recentChats, setRecentChats] = useState([]);

    useEffect(() => {
        if (user === null) return;
        getFollowers().then(setRecentChats);
    }, [user]);

    return { recentChats };
}

export default useMessaging;
