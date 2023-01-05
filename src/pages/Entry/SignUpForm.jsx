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
        if (password !== rePassword) return alert('Passwords do not match!');
        signUpUser(name, email, password)
            .then(() => navigate('/home?signUp=true'))
            .catch(err => alert('There was an error creating your account: ' + err));
    };

    const handleSignIn = () => {
        signInUser(email, password)
            .then(() => navigate('/home'))
            .catch(err => alert('There was an error logging in: ' + err));
    };

    return (
        <div className='min-h-screen flex items-center w-full px-5 md:px-10 py-16'>
            <div className='flex flex-col gap-4 w-full max-w-sm mx-auto'>
                <h2 className='text-primary text-center text-lg font-extrabold mb-5'>Sign Up</h2>
                <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4 w-full'>
                    <InputGroup setValue={setName} label='Display name' id='name' type='text' placeholder='Type here' />
                    <InputGroup setValue={setEmail} label='Email' id='email' type='email' placeholder='Type here' />
                    <InputGroup setValue={setPassword} label='Password' id='password' type='password' placeholder='Type here' />
                    <InputGroup setValue={setRePassword} label='Confirm Password' id='rePassword' type='password' placeholder='Type here' />
                    <Button type='submit' label='Create Account' onClick={handleSignUp} />
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
