import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { useUserContext } from '../../context/UserContext';
import InputGroup from './InputGroup';

const SignInForm = ({ setSigningUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signInUser, signInWithGoogle } = useUserContext();

    const handleSignIn = () => {
        if (email === '' || password === '') return alert('Please fill in all fields');
        signInUser(email, password);
    };

    return (
        <div className='min-h-screen flex items-center w-full px-5 md:px-10 py-16'>
            <div className='flex flex-col gap-4 w-full max-w-sm mx-auto'>
                <h2 className='text-primary text-center text-lg font-extrabold mb-5'>Sign In</h2>
                <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 w-full'>
                    <InputGroup setValue={setEmail} label='Email' id='email' type='email' placeholder='Type here' />
                    <InputGroup setValue={setPassword} label='Password' id='password' type='password' placeholder='Type here' />
                    <Button type='submit' label='Sign In' onClick={handleSignIn} />
                </form>
                <div className='border-t border-gray-300 w-full h-px my-2' />
                <button onClick={signInWithGoogle} className='bg-blue-600 text-white text-sm py-1 px-5 rounded'>
                    Continue with Google
                </button>
                <button onClick={() => setSigningUp(true)} className='text-xs text-primary text-center font-medium'>
                    Don't have an account? Sign up
                </button>
            </div>
        </div>
    );
};

export default SignInForm;
