import { createContext, useContext } from 'react';
import { useUserContext } from './UserContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { doc, setDoc, getDoc, query, collection, getDocs, where, documentId, deleteDoc, updateDoc } from 'firebase/firestore';

const ThreadContext = createContext({});
const useThreadContext = () => useContext(ThreadContext);

const ThreadProvider = ({ children }) => {
    const { user, getUserRank } = useUserContext();

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
            comments[comments.length - 1] = { ...comments[comments.length - 1], ...(await getAuthor(data.authorId)), vote: await getUserVote(doc.id, 'comment') };
        });
        return comments;
    }

    async function getUserVote(postId, type) {
        const itemsRef = collection(db, `${type}_vote`);
        const q = query(itemsRef, where(`${type}_id`, '==', postId), where('user_id', '==', user?.id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return null;
        return querySnapshot.docs[0].data().vote;
    }

    async function deleteComment(id) {
        const itemsRef = collection(db, 'comment');
        const q = query(itemsRef, where('parentCommentId', '==', id));
        const querySnapshot = await getDocs(q);
        const childComments = [];
        querySnapshot.forEach(doc => {
            childComments.push(doc.id);
        });
        for (const id of childComments) {
            await deleteDoc(doc(db, 'comment', id));
        }
        await deleteDoc(doc(db, 'comment', id));
        return id;
    }

    async function deleteThread(id) {
        await deleteDoc(doc(db, 'thread', id));
    }

    async function handleVote(postId, type, variation) {
        const dbName = `${type}_vote`;
        const itemsRef = collection(db, dbName);
        const q = query(itemsRef, where(`${type}_id`, '==', postId), where('user_id', '==', user.id));
        const querySnapshot = await getDocs(q);
        let deletedVote = false;
        if (querySnapshot.empty) {
            await setDoc(doc(db, dbName, uuidv4()), {
                user_id: user.id,
                [`${type}_id`]: postId,
                vote: variation,
            });
        } else {
            const postDoc = querySnapshot.docs[0];
            const { vote } = postDoc.data();
            if (vote === variation) {
                await deleteDoc(doc(db, dbName, postDoc.id));
                deletedVote = true;
            } else {
                const docRef = doc(db, dbName, postDoc.id);
                await updateDoc(docRef, {
                    vote: vote === 'upvote' ? 'downvote' : 'upvote',
                });
            }
        }

        const docRef = doc(db, type, postId);
        const docSnap = await getDoc(docRef);
        const post = docSnap.data();
        const userRank = getUserRank();

        let variationType = variation;
        if (deletedVote && variationType === 'upvote') variationType = 'downvote';
        else if (deletedVote && variationType === 'downvote') variationType = 'upvote';

        const alteration = variationType === 'upvote' ? Number(post[userRank]) + 1 : Number(post[userRank]) - 1;
        await updateDoc(docRef, {
            [userRank]: alteration,
        });

        return { postId, userRank, alteration, vote: variationType };
    }

    async function updatePost(id, type, body) {
        const docRef = doc(db, type, id);
        await updateDoc(docRef, { body });
        return { id, body };
    }

    return (
        <ThreadContext.Provider value={{ createThread, getAllThreads, getThreadById, createComment, getThreadComments, getAuthor, deleteComment, deleteThread, handleVote, updatePost }}>
            {children}
        </ThreadContext.Provider>
    );
};

export { useThreadContext, ThreadProvider };
