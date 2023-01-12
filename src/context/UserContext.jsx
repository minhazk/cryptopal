import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, addDoc, collection, query, documentId, where, deleteDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userTags, setUserTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
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
            })
            .catch(err => alert('There was an error creating your account: ' + err));

    const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider()).then(() => navigate('/home'));

    const logout = () => {
        auth.signOut().then(() => {
            setUser(null);
            navigate('/');
        });
    };

    const updateUserTags = async tags => {
        if (user === null) return;
        await setDoc(doc(db, 'user_tag', user.id), {
            interests: tags.map(tag => tag.id),
        });
        setUserTags(tags);
    };

    async function getAllTags() {
        const q = query(collection(db, 'tag'));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            tags.push({ id: doc.id, ...doc.data() });
        });
        setAllTags(tags);
    }

    async function getUserTags() {
        if (user === null) return;
        const docRef = doc(db, 'user_tag', user.id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return setUserTags([]);
        const ids = docSnap.data().interests;
        if (ids.length === 0) return setUserTags([]);
        const itemsRef = collection(db, 'tag');
        const q = query(itemsRef, where(documentId(), 'in', ids));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            tags.push({ id: doc.id, ...doc.data() });
        });
        setUserTags(tags);
    }

    async function getUserById(id) {
        const docRef = doc(db, 'user', id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    useEffect(() => {
        return () =>
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
                    getAllTags();
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

    useEffect(() => {
        if (user === null) return;
        getUserTags();
    }, [user]);

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
        const q = query(itemsRef, where('authorId', '==', id), where('parentCommentId', '==', null));
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
        await setDoc(doc(db, 'achievement', id), {
            bronze: 0,
            silver: 0,
            gold: 0,
            userId: user.id,
            imgUrl,
        });
    }

    return (
        <UserContext.Provider
            value={{
                user,
                userTags,
                signUpUser,
                signInUser,
                signInWithGoogle,
                logout,
                updateUserTags,
                tags: allTags,
                getUserById,
                getUserRank,
                followUser,
                unfollowUser,
                getUserStats,
                isFollowing,
                getUserAchievements,
                getUserComments,
                createAchievement,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { useUserContext, UserProvider };
