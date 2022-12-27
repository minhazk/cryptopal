import React from 'react';
import { IconContext } from 'react-icons';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineMessage, AiOutlineUser } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';

const Header = ({ setBurgerOpen, burgerOpen, profileOpen, setProfileOpen }) => {
    return (
        <header className='flex items-center px-5 py-2 mb-4'>
            <button onClick={() => setBurgerOpen(prev => !prev)} className='md:hidden'>
                {!burgerOpen ? <RxHamburgerMenu size={22} className='mr-2' /> : <CgClose size={22} className='mr-2' />}
            </button>
            <h1 className='text-xl font-extrabold text-primary tracking-wide'>CRYPTOPAL</h1>
            <div className='ml-auto flex items-center gap-3'>
                <p className='hidden md:block text-xs'>John Doe</p>
                <IconContext.Provider value={{ size: '21px' }}>
                    <AiOutlineMessage className='md:hidden' />
                    <button onClick={() => setProfileOpen(prev => !prev)}>{!profileOpen ? <AiOutlineUser /> : <CgClose />}</button>
                </IconContext.Provider>
            </div>
        </header>
    );
};

export default Header;
