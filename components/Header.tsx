import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EvCarIcon } from './icons/EvCarIcon';

const Header: React.FC = () => {
    const location = useLocation();

    const linkClasses = (path: string) => 
        `text-gray-600 hover:text-blue-600 transition-colors duration-300 ${location.pathname === path ? 'font-semibold text-blue-600' : ''}`;

    const aboutLinkClasses = `text-gray-600 hover:text-blue-600 transition-colors duration-300`;
    
    const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If we are on the homepage, prevent the default link behavior and scroll manually for a smooth effect.
        if (location.pathname === '/') {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }
        // If we are on another page, we let the <a> tag handle navigation naturally.
        // This will take the user to the home page, where another script handles scrolling to the 'about' section.
    };
    
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <EvCarIcon className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">EV Explorer</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={linkClasses('/')}>Home</Link>
                        <Link to="/map" className={linkClasses('/map')}>Map</Link>
                        <a href="/#about" onClick={handleAboutClick} className={aboutLinkClasses}>About</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;