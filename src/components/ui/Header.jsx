import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineMessage, AiOutlineUser } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const Header = () => {
    return (
        <header className='flex items-center px-5 py-2 mb-4'>
            <RxHamburgerMenu size={22} className='mr-2' />
            <h1 className='text-xl font-extrabold text-primary tracking-wide'>CRYPTOPAL</h1>
            <div className='ml-auto flex items-center gap-3'>
                <p className='hidden sm:block text-xs'>John Doe</p>
                <IconContext.Provider value={{ size: '21px' }}>
                    <AiOutlineMessage className='sm:hidden' />
                    <AiOutlineUser />
                </IconContext.Provider>
            </div>
        </header>
    );
};

export default Header;
