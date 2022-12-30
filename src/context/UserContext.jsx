import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, query, documentId, where } from 'firebase/firestore';

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userTags, setUserTags] = useState([]);
    const [userPoints, setUserPoints] = useState(0);
    const [userThreads, setUserThreads] = useState([]);
    const [allTags, setAllTags] = useState([]);

    const signUpUser = (displayName, email, password) =>
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => updateProfile(getAuth().currentUser, { displayName }))
            .then(() => localStorage.setItem('cryptopal@userLoggedIn', 'true'))
            .catch(() => alert('There was an error creating your account.'));

    const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

    const logout = () => {
        auth.signOut();
        setUser(null);
    };

    const updateUserTags = async tags => {
        if (user === null) return;
        await setDoc(doc(db, 'userTags', user.id), {
            // interests: tags,
            interests: tags.map(tag => tag.id),
        });
        setUserTags(tags);
    };

    async function getAllTags() {
        const q = query(collection(db, 'Tags'));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            const { colour, name } = doc.data();
            tags.push({ id: doc.id, label: name, color: colour });
        });
        setAllTags(tags);
    }

    async function getUserTags() {
        if (user === null) return;
        const docRef = doc(db, 'userTags', user.id);
        const docSnap = await getDoc(docRef);
        const ids = docSnap.data().interests;
        if (ids.length === 0) return setUserTags([]);
        const itemsRef = collection(db, 'Tags');
        const q = query(itemsRef, where(documentId(), 'in', ids));
        const querySnapshot = await getDocs(q);
        const tags = [];
        querySnapshot.forEach(doc => {
            const { name, colour } = doc.data();
            tags.push({ id: doc.id, label: name, color: colour });
        });
        setUserTags(tags);
    }

    useEffect(() => {
        return () =>
            auth.onAuthStateChanged(async authUser => {
                if (authUser) {
                    setUser({ id: authUser.uid, displayName: authUser.displayName, email: authUser.email, photoUrl: authUser.photoURL });
                    getAllTags();
                }
            });
    }, []);

    useEffect(() => {
        if (user === null) return;
        getUserTags();
    }, [user]);

    return <UserContext.Provider value={{ user, userTags, signUpUser, signInUser, signInWithGoogle, logout, updateUserTags, allTags, userPoints }}>{children}</UserContext.Provider>;
};

export { useUserContext, UserProvider };
