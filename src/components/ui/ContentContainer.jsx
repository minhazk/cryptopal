import React from 'react';

const ContentContainer = ({ children }) => {
    return <div className='mx-auto px-5 pb-10 flex lg:max-w-[85%]'>{children}</div>;
};

export default ContentContainer;
