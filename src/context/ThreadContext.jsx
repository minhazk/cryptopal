import { createContext, useContext, useState } from 'react';
import { useUserContext } from './UserContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const ThreadContext = createContext({});
const useThreadContext = () => useContext(ThreadContext);

const ThreadProvider = ({ children }) => {
    const { user } = useUserContext();

    async function createThread(title, body, tagIds) {
        const newThread = {
            title,
            body,
            authorId: user.id,
            timestamp: new Date(),
            bronze: 0,
            silver: 0,
            gold: 0,
            tagIds,
        };
        await setDoc(doc(db, 'threads', uuidv4()), newThread);
    }

    return <ThreadContext.Provider value={{ createThread }}>{children}</ThreadContext.Provider>;
};

export { useThreadContext, ThreadProvider };
