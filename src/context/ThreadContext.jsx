import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from './UserContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { doc, setDoc, getDoc, query, collection, getDocs, where, documentId } from 'firebase/firestore';

const ThreadContext = createContext({});
const useThreadContext = () => useContext(ThreadContext);

const ThreadProvider = ({ children }) => {
    const { user } = useUserContext();

    async function createThread(title, body, tagIds) {
        const id = uuidv4();
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
        await setDoc(doc(db, 'thread', id), newThread);
        return { ...newThread, author: user.displayName, id };
    }

    async function getAuthor(id) {
        const docRef = doc(db, 'user', id);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        return { authorId: user.id, author: user.displayName };
    }

    async function getTagsByIds(ids) {
        if (ids.length === 0) return [];
        const itemsRef = collection(db, 'tag');
        const q = query(itemsRef, where(documentId(), 'in', ids));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            tags.push({ id: doc.id, ...doc.data() });
        });
        return tags;
    }

    async function getAllThreads() {
        const q = query(collection(db, 'thread'));
        const querySnapshot = await getDocs(q);
        const threads = [];
        querySnapshot.forEach(async doc => {
            const { title, body, authorId, bronze, silver, gold, tagIds, timestamp } = doc.data();
            threads.push({ id: doc.id, title, body, bronze, silver, gold, ...(await getAuthor(authorId)), tags: await getTagsByIds(tagIds), timestamp: Number(timestamp.seconds) * 1000 });
        });
        return threads;
    }

    async function getThreadById(id) {
        const docRef = doc(db, 'thread', id);
        const docSnap = await getDoc(docRef);
        const thread = docSnap.data();
        return { id, ...thread, timestamp: Number(thread.timestamp.seconds) * 1000, tags: await getTagsByIds(thread.tagIds), ...(await getAuthor(thread.authorId)) };
    }

    async function createComment(body, parentThreadId, parentCommentId) {
        const newComment = {
            body,
            authorId: user.id,
            timestamp: new Date(),
            bronze: 0,
            silver: 0,
            gold: 0,
            parentThreadId,
            parentCommentId,
        };
        const id = uuidv4();
        await setDoc(doc(db, 'comment', id), newComment);
        return { ...newComment, id };
    }

    async function getThreadComments(id) {
        const itemsRef = collection(db, 'comment');
        const q = query(itemsRef, where('parentThreadId', '==', id));
        const querySnapshot = await getDocs(q);
        const comments = [];
        querySnapshot.forEach(async doc => {
            const data = doc.data();
            comments.push({ id: doc.id, ...data, timestamp: Number(data.timestamp.seconds) * 1000 });
            comments[comments.length - 1] = { ...comments[comments.length - 1], ...(await getAuthor(data.authorId)) };
        });
        return comments;
    }

    return <ThreadContext.Provider value={{ createThread, getAllThreads, getThreadById, createComment, getThreadComments, getAuthor }}>{children}</ThreadContext.Provider>;
};

export { useThreadContext, ThreadProvider };
