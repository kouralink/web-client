import React from 'react';
import Logo  from '../../assets/logo.png'

const Navbar: React.FC = () => {
    return (
        <nav className='flex justify-between bg-white px-6 py-1 items-center'>
            <div className='flex items-center gap-2'>
                <img src={Logo} alt="logo" width={30} />
                <h1>Kouralink</h1>
            </div>
            <ul className='flex gap-4'>
                <li>About</li>
                <li>Home</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;