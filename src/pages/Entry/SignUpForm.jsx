import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useUserContext } from '../../context/UserContext';
import InputGroup from './InputGroup';

const SignUpForm = ({ setSigningUp }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { signUpUser, signInWithGoogle } = useUserContext();
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (name === '' || email === '' || password === '' || rePassword === '') return alert('Please fill in all fields');
        if (password !== rePassword) return alert('Passwords do not match!');
        signUpUser(name, email, password);
    };

    return (
        <div className='min-h-screen flex items-center w-full px-5 md:px-10 py-16'>
            <div className='flex flex-col gap-4 w-full max-w-sm mx-auto'>
                <h2 className='text-primary text-center text-lg font-extrabold mb-5'>Sign Up</h2>
                <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 w-full'>
                    <InputGroup setValue={setName} label='Display name' id='name' type='text' placeholder='Type here' testID='displayName' />
                    <InputGroup setValue={setEmail} label='Email' id='email' type='email' placeholder='Type here' testID='email' />
                    <InputGroup setValue={setPassword} label='Password' id='password' type='password' placeholder='Type here' testID='password' />
                    <InputGroup setValue={setRePassword} label='Confirm Password' id='rePassword' type='password' placeholder='Type here' />
                    <Button type='submit' label='Create Account' onClick={handleSignUp} testID='registerBtn' />
                </form>
                <div className='border-t border-gray-300 w-full h-px my-2' />
                <button onClick={signInWithGoogle} className='bg-blue-600 text-white text-sm py-1 px-5 rounded'>
                    Continue with Google
                </button>
                <button onClick={() => setSigningUp(false)} className='text-xs text-primary text-center font-medium'>
                    Already have an account? Sign in
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;
