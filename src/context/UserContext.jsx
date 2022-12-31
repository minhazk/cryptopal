import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, query, documentId, where } from 'firebase/firestore';

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userTags, setUserTags] = useState([]);
    const [allTags, setAllTags] = useState([]);

    const signUpUser = (displayName, email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => updateProfile(getAuth().currentUser, { displayName }))
            .then(() => {
                const user = getAuth().currentUser;
                setDoc(doc(db, 'user', user.uid), {
                    id: user.uid,
                    displayName,
                    email,
                    createdAt: user.metadata.createdAt,
                    photoURL: user.photoURL,
                });
            })
            .catch(() => alert('There was an error creating your account.'));

    const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

    const logout = () => {
        auth.signOut();
        setUser(null);
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

    useEffect(() => {
        return () =>
            auth.onAuthStateChanged(async authUser => {
                if (authUser) {
                    // query user id and set it
                    const docRef = doc(db, 'user', authUser.uid);
                    const docSnap = await getDoc(docRef);
                    const user = docSnap.data();
                    setUser({ id: user.id, displayName: user.displayName, email: user.email, photoUrl: user.photoURL });
                    getAllTags();
                }
            });
    }, []);

    useEffect(() => {
        if (user === null) return;
        getUserTags();
    }, [user]);

    return <UserContext.Provider value={{ user, userTags, signUpUser, signInUser, signInWithGoogle, logout, updateUserTags, allTags, userPoints: 0 }}>{children}</UserContext.Provider>;
};

export { useUserContext, UserProvider };
