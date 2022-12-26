import React from 'react';

const InputGroup = ({ label, id, type, placeholder }) => {
    return (
        <div className='flex flex-col'>
            <label htmlFor={id} className='uppercase text-primary text-[11px] ml-2 font-semibold'>
                {label}
            </label>
            <input type={type} placeholder={placeholder} className='text-xs py-2 px-2 rounded border border-gray-300' />
        </div>
    );
};

export default InputGroup;
