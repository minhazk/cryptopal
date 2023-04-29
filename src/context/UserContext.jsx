import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, addDoc, collection, query, documentId, where, deleteDoc, updateDoc, limit, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const signUpUser = (displayName, email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const user = getAuth().currentUser;
                setDoc(doc(db, 'user', user.uid), {
                    id: user.uid,
                    displayName,
                    email,
                    createdAt: user.metadata.createdAt,
                    photoURL: user.photoURL,
                    points: 0,
                });
                navigate('/home?signUp=true');
            })
            .catch(err => alert('There was an error creating your account: ' + err));

    const signInUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            alert('Failed to sign in');
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (e) {
            alert('Failed to sign in');
        }
    };

    const logout = () => {
        auth.signOut().then(() => {
            setUser(null);
            navigate('/');
        });
    };

    const updateUserTags = async tagIds => {
        console.log(user);
        try {
            const docRef = doc(db, 'user_tag', user.id);
            await updateDoc(docRef, {
                tag_ids: tagIds,
            });
        } catch (e) {
            await setDoc(doc(db, 'user_tag', user.id), { tag_ids: tagIds });
        }
        return tagIds;
    };

    async function getAllTags(limited) {
        let q;
        if (limited) q = query(collection(db, 'tag'), limit(8));
        else q = query(collection(db, 'tag'));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            tags.push({ id: doc.id, ...doc.data() });
        });
        return tags;
    }

    async function getUserTags(userId) {
        const userTagRef = collection(db, 'user_tag');
        const userTagQ = query(userTagRef, where(documentId(), '==', userId));
        const userTagSnapshot = await getDocs(userTagQ);
        if (userTagSnapshot.empty) return [];
        const tagIds = userTagSnapshot.docs[0].data().tag_ids;
        if (tagIds.length === 0) return [];
        const itemsRef = collection(db, 'tag');
        const q = query(itemsRef, where(documentId(), 'in', tagIds));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            tags.push({ id: doc.id, ...doc.data() });
        });
        return tags;
    }

    async function getUserById(id) {
        const docRef = doc(db, 'user', id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    useEffect(() => {
        auth.onAuthStateChanged(async authUser => {
            if (authUser) {
                const docRef = doc(db, 'user', authUser.uid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    await setDoc(doc(db, 'user', authUser.uid), {
                        id: authUser.uid,
                        displayName: authUser.displayName,
                        email: authUser.email,
                        createdAt: authUser.metadata.createdAt,
                        photoURL: authUser.photoURL,
                        points: 0,
                    });
                }
                const user = docSnap.data();
                setUser({ id: user.id, displayName: user.displayName, email: user.email, photoUrl: user.photoURL, points: user.points });
            }
        });
    }, []);

    function getUserRank() {
        return user.points < 500 ? 'bronze' : user.points < 1000 ? 'silver' : 'gold';
    }

    async function followUser(id) {
        await addDoc(collection(db, 'relationship'), {
            followerId: user.id,
            followingId: id,
        });
    }

    async function unfollowUser(id) {
        const itemsRef = collection(db, 'relationship');
        const q = query(itemsRef, where('followerId', '==', user.id), where('followingId', '==', id));
        const querySnapshot = await getDocs(q);
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(db, 'relationship', docId));
    }

    async function getUserStats(id) {
        const threadsRef = collection(db, 'thread');
        const threadQ = query(threadsRef, where('authorId', '==', id));
        const threadSnapshot = await getDocs(threadQ);

        const relationshipRef = collection(db, 'relationship');
        const followersQ = query(relationshipRef, where('followingId', '==', id));
        const followersSnapshot = await getDocs(followersQ);

        const followingQ = query(relationshipRef, where('followerId', '==', id));
        const followingSnapshot = await getDocs(followingQ);

        return { threads: threadSnapshot.size, followers: followersSnapshot.size, following: followingSnapshot.size };
    }

    async function isFollowing(id) {
        const itemsRef = collection(db, 'relationship');
        const q = query(itemsRef, where('followerId', '==', user.id), where('followingId', '==', id));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    async function getUserAchievements(id) {
        const itemsRef = collection(db, 'achievement');
        const q = query(itemsRef, where('userId', '==', id));
        const querySnapshot = await getDocs(q);
        const achievements = [];
        for await (const achievement of querySnapshot.docs) {
            achievements.push({
                id: achievement.id,
                ...achievement.data(),
            });
        }
        return achievements;
    }

    async function getThreadTitle(id) {
        const itemsRef = collection(db, 'thread');
        const q = query(itemsRef, where(documentId(), '==', id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return 'Deleted';
        return querySnapshot.docs[0].data().title;
    }

    async function getUserComments(id) {
        const itemsRef = collection(db, 'comment');
        const q = query(itemsRef, where('authorId', '==', id), where('parentCommentId', '==', null), limit(4), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const comments = [];
        for await (const comment of querySnapshot.docs) {
            comments.push({
                id: comment.id,
                ...comment.data(),
                parentThreadTitle: await getThreadTitle(comment.data().parentThreadId),
            });
        }
        return comments;
    }

    async function uploadImage(file, id) {
        const storageRef = ref(storage, id);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(ref(storage, id));
    }

    async function createAchievement(file) {
        const id = uuidv4();
        const imgUrl = await uploadImage(file, id);
        const achievement = {
            bronze: 0,
            silver: 0,
            gold: 0,
            userId: user.id,
            imgUrl,
        };
        await setDoc(doc(db, 'achievement', id), achievement);
        return achievement;
    }

    async function getFollowers() {
        const relationshipRef = collection(db, 'relationship');
        const followersQ = query(relationshipRef, where('followerId', '==', user.id));
        const followersSnapshot = await getDocs(followersQ);

        const followingQ = query(relationshipRef, where('followingId', '==', user.id));
        const followingSnapshot = await getDocs(followingQ);
        if (followersSnapshot.empty && followingSnapshot.empty) return [];

        const ids = [...new Set([...followersSnapshot.docs.map(doc => doc.data().followingId), ...followingSnapshot.docs.map(doc => doc.data().followerId)])].filter(id => id !== user.id);

        const usersRef = collection(db, 'user');
        const usersQ = query(usersRef, where(documentId(), 'in', ids));
        const usersSnapshot = await getDocs(usersQ);
        return usersSnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
    }

    async function getChat(recipientId) {
        const docRef = collection(db, 'message');
        const ids = [user.id, recipientId];
        const q1 = query(docRef, where('senderId', '==', user.id), where('recipientId', '==', recipientId));
        const q2 = query(docRef, where('recipientId', '==', user.id), where('senderId', '==', recipientId));
        const senderSnapshot = await getDocs(q1);
        const recipientSnapshot = await getDocs(q2);
        const senderMsgs = senderSnapshot.empty
            ? []
            : senderSnapshot.docs.map(doc => {
                  return { id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.seconds * 1000 };
              });
        const recipientMsgs = recipientSnapshot.empty
            ? []
            : recipientSnapshot.docs.map(doc => {
                  return { id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.seconds * 1000 };
              });
        return [...new Map([...senderMsgs, ...recipientMsgs].map(msg => [msg.id, msg])).values()].sort((a, b) => a.timestamp - b.timestamp);
    }

    async function sendMessage(recipientId, body) {
        const id = uuidv4();
        const message = {
            senderId: user.id,
            recipientId,
            displayName: user.displayName,
            body,
            timestamp: new Date(),
        };
        setDoc(doc(db, 'message', id), message);
        return { id, ...message };
    }

    return (
        <UserContext.Provider
            value={{
                user,
                signUpUser,
                signInUser,
                signInWithGoogle,
                logout,
                updateUserTags,
                getAllTags,
                getUserById,
                getUserRank,
                followUser,
                unfollowUser,
                getUserStats,
                isFollowing,
                getUserAchievements,
                getUserComments,
                createAchievement,
                getUserTags,
                getFollowers,
                getChat,
                sendMessage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { useUserContext, UserProvider };
