import { createContext, useContext } from 'react';
import { useUserContext } from './UserContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { doc, setDoc, getDoc, query, collection, getDocs, where, documentId, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

const ThreadContext = createContext({});
const useThreadContext = () => useContext(ThreadContext);

const ThreadProvider = ({ children }) => {
    const { user, getUserRank } = useUserContext();

    async function createThread(title, body, tags) {
        const id = uuidv4();
        const newThread = {
            title,
            body,
            authorId: user.id,
            timestamp: new Date(),
            bronze: 0,
            silver: 0,
            gold: 0,
            tagIds: tags.map(tag => tag.id),
            [getUserRank(user.id)]: 1,
        };
        await setDoc(doc(db, 'thread', id), newThread);
        await setDoc(doc(db, 'thread_vote', uuidv4()), {
            user_id: user.id,
            thread_id: id,
            vote: 'upvote',
        });
        return { ...newThread, tags, vote: 'upvote', author: user.displayName, id };
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

    async function formatThreads(snapshot) {
        const threads = [];
        for await (const threadDoc of snapshot.docs) {
            const { authorId, timestamp, tagIds } = threadDoc.data();
            threads.push({
                ...threadDoc.data(),
                id: threadDoc.id,
                ...(await getAuthor(authorId)),
                tags: await getTagsByIds(tagIds),
                timestamp: timestamp.seconds * 1000,
                vote: await getUserVote(threadDoc.id, 'thread'),
            });
        }
        return threads;
    }

    async function getAllThreads(filter) {
        console.log(filter);
        if (filter === undefined) {
            const q = query(collection(db, 'thread'));
            const querySnapshot = await getDocs(q);
            return await formatThreads(querySnapshot);
        } else if (filter === 'user') {
            const q = query(collection(db, 'thread'), where('authorId', '==', user.id));
            const querySnapshot = await getDocs(q);
            return await formatThreads(querySnapshot);
        } else if (filter === 'following') {
            const filterQ = query(collection(db, 'relationship'), where('followerId', '==', user.id));
            const followingSnapshot = await getDocs(filterQ);
            const userIds = followingSnapshot.docs.map(doc => doc.data().followingId);
            const q = query(collection(db, 'thread'));
            const querySnapshot = await getDocs(q);
            return (await formatThreads(querySnapshot)).filter(thread => userIds.some(id => thread.authorId === id));
        } else if (filter === 'saved') {
            const filterQ = query(collection(db, 'saved'), where('userId', '==', user.id));
            const savedSnapshot = await getDocs(filterQ);
            const threadIds = savedSnapshot.docs.map(doc => doc.data().threadId);
            const q = query(collection(db, 'thread'));
            const querySnapshot = await getDocs(q);
            return (await formatThreads(querySnapshot)).filter(thread => threadIds.some(id => thread.id === id));
        }
        return [];
    }

    async function getThreadById(id) {
        const docRef = doc(db, 'thread', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        const thread = docSnap.data();
        return {
            id,
            ...thread,
            timestamp: Number(thread.timestamp.seconds) * 1000,
            tags: await getTagsByIds(thread.tagIds),
            ...(await getAuthor(thread.authorId)),
            vote: await getUserVote(id, 'thread'),
        };
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
            [getUserRank(user.id)]: 1,
        };
        const id = uuidv4();
        await setDoc(doc(db, 'comment', id), newComment);
        await setDoc(doc(db, 'comment_vote', uuidv4()), {
            user_id: user.id,
            comment_id: id,
            vote: 'upvote',
        });
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
        const itemsRef = collection(db, 'comment');
        const q = query(itemsRef, where('parentThreadId', '==', id));
        const querySnapshot = await getDocs(q);
        const childComments = [];
        querySnapshot.forEach(doc => {
            childComments.push(doc.id);
        });
        for (const id of childComments) {
            await deleteDoc(doc(db, 'comment', id));
        }
    }

    async function getUserPoints(id) {
        const docRef = doc(db, 'user', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data().points;
    }

    async function handleVote(postId, type, variation, postAuthorId) {
        const dbName = `${type}_vote`;
        const itemsRef = collection(db, dbName);
        const q = query(itemsRef, where(`${type}_id`, '==', postId), where('user_id', '==', user.id));
        const querySnapshot = await getDocs(q);
        let deletedVote = false;
        let changingVote = false;
        const multiplier = type === 'thread' ? 1 : type === 'comment' ? 2 : 3;

        const authorPoints = await getUserPoints(postAuthorId);
        const userRef = doc(db, 'user', postAuthorId);

        if (querySnapshot.empty) {
            await setDoc(doc(db, dbName, uuidv4()), {
                user_id: user.id,
                [`${type}_id`]: postId,
                vote: variation,
            });
            await updateDoc(userRef, { points: authorPoints + multiplier * (variation === 'upvote' ? 1 : -1) });
        } else {
            const postDoc = querySnapshot.docs[0];
            const { vote } = postDoc.data();
            if (vote === variation) {
                await deleteDoc(doc(db, dbName, postDoc.id));
                await updateDoc(userRef, { points: authorPoints + multiplier + (variation === 'upvote' ? -1 : 1) });
                deletedVote = true;
            } else {
                const docRef = doc(db, dbName, postDoc.id);
                await updateDoc(docRef, {
                    vote: vote === 'upvote' ? 'downvote' : 'upvote',
                });
                await updateDoc(userRef, { points: authorPoints + multiplier + (variation === 'upvote' ? 2 : -2) });
                changingVote = true;
            }
        }

        const docRef = doc(db, type, postId);
        const docSnap = await getDoc(docRef);
        const post = docSnap.data();
        const userRank = getUserRank();

        const alterNum = deletedVote ? -1 : changingVote ? 2 : 1;
        const alteration = variation === 'upvote' ? post[userRank] + alterNum : post[userRank] - alterNum;
        await updateDoc(docRef, { [userRank]: alteration });

        return { postId, userRank, alteration, vote: deletedVote ? null : variation };
    }

    async function updatePost(id, type, body) {
        const docRef = doc(db, type, id);
        await updateDoc(docRef, { body });
        return { id, body };
    }

    async function saveThread(id) {
        await addDoc(collection(db, 'saved'), {
            userId: user.id,
            threadId: id,
        });
    }

    async function unSaveThread(id) {
        const itemsRef = collection(db, 'saved');
        const q = query(itemsRef, where('userId', '==', user.id), where('threadId', '==', id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return;
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(db, 'saved', docId));
    }

    async function isThreadSaved(id) {
        const itemsRef = collection(db, 'saved');
        const q = query(itemsRef, where('userId', '==', user.id), where('threadId', '==', id));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    return (
        <ThreadContext.Provider
            value={{
                createThread,
                getAllThreads,
                getThreadById,
                createComment,
                getThreadComments,
                getAuthor,
                deleteComment,
                deleteThread,
                handleVote,
                updatePost,
                getUserVote,
                saveThread,
                unSaveThread,
                isThreadSaved,
            }}
        >
            {children}
        </ThreadContext.Provider>
    );
};

export { useThreadContext, ThreadProvider };
