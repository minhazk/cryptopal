import React from 'react';

const Button = ({ label, onClick, type = 'button', testID = null }) => {
    return (
        <button onClick={onClick} type={type} className='bg-primary text-white text-sm py-1 px-3 rounded' data-testid={testID} style={{ fontSize: 'inherit' }}>
            {label}
        </button>
    );
};

export default Button;
