import React from 'react';
import { IconContext } from 'react-icons';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineMessage, AiOutlineUser } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Header = ({ setBurgerOpen, burgerOpen, profileOpen, setProfileOpen }) => {
    return (
        <header className='flex items-center px-5 lg:px-10 lg:max-w-[85%] mx-auto py-2 mb-4'>
            <button onClick={() => setBurgerOpen(prev => !prev)} className='md:hidden'>
                {!burgerOpen ? <RxHamburgerMenu size={22} className='mr-2' /> : <CgClose size={22} className='mr-2' />}
            </button>
            <Link to='/home' className='text-xl font-extrabold text-primary tracking-wide'>
                CRYPTOPAL
            </Link>
            <div className='ml-auto flex items-center gap-3'>
                <p className='hidden md:block text-xs'>John Doe</p>
                <IconContext.Provider value={{ size: '21px' }}>
                    <Link to='/'>
                        <AiOutlineMessage className='md:hidden' />
                    </Link>
                    <button onClick={() => setProfileOpen(prev => !prev)}>{!profileOpen ? <AiOutlineUser /> : <CgClose />}</button>
                </IconContext.Provider>
            </div>
        </header>
    );
};

export default Header;
