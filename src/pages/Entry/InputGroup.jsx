import React from 'react';

const InputGroup = ({ label, id, type, placeholder, setValue }) => {
    return (
        <div className='flex flex-col'>
            <label htmlFor={id} className='uppercase text-primary text-[11px] ml-2 font-semibold'>
                {label}
            </label>
            <input
                onChange={e => setValue(e.target.value)}
                type={type}
                placeholder={placeholder}
                className='text-xs py-2 px-2 rounded border border-gray-300 outline-none transition-shadow duration-300 focus:shadow-[0_0_0_.175rem] focus:shadow-blue-300 focus:border-primary'
                required
            />
        </div>
    );
};

export default InputGroup;
