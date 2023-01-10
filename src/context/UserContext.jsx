import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, query, documentId, where } from 'firebase/firestore';

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userTags, setUserTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const navigate = useNavigate();

    const signUpUser = (displayName, email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
            // .then(() => updateProfile(getAuth().currentUser, { displayName }))
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
            .catch(() => alert('There was an error creating your account.'));

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

    useEffect(() => {
        if (user === null) return;
        getUserTags();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, userTags, signUpUser, signInUser, signInWithGoogle, logout, updateUserTags, tags: allTags, getUserById, getUserRank }}>{children}</UserContext.Provider>
    );
};

export { useUserContext, UserProvider };
