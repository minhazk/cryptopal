import React from 'react';

const Button = ({ label, onClick, type = 'button' }) => {
    return (
        <button onClick={onClick} type={type} className='bg-primary text-white text-sm py-1 px-3 rounded'>
            {label}
        </button>
    );
};

export default Button;
