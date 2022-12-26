import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputGroup from './InputGroup';

const SignUpForm = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex items-center'>
            <div className='flex flex-col gap-4 w-full max-w-sm mx-auto'>
                <h2 className='text-primary text-center text-lg font-bold mb-5'>Sign Up</h2>
                <InputGroup label='Email' id='email' type='email' placeholder='Type here' />
                <InputGroup label='Password' id='password' type='password' placeholder='Type here' />
                <InputGroup label='Confirm Password' id='rePassword' type='password' placeholder='Type here' />
                <Button label='Create Account' onClick={() => navigate('/home')} />
                <div className='border-t border-gray-300 w-full h-px my-2' />
                <button className='bg-blue-600 text-white text-sm py-1 px-5 rounded'>Continue with Google</button>
                <p className='text-xs text-primary text-center font-medium'>Already have an account? Sign in</p>
            </div>
        </div>
    );
};

export default SignUpForm;
