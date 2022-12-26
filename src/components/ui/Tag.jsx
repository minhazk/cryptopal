import React from 'react';

const Tag = ({ label, color }) => {
    return (
        <div className='rounded px-2 py-1 text-white text-sm font-semibold text-center' style={{ backgroundColor: color }}>
            {label}
        </div>
    );
};

export default Tag;
