import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // React Icons for theme toggle
import useThemeMode from '../hooks/useThemeMode';
import '../styles/Header.scss';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { mode, toggleMode } = useThemeMode(); // Get the current mode and toggle function

  return (
    <header className="header">
      <div className='header-inner'> 
      <h1>{children}</h1>
      <button className="theme-toggle" onClick={toggleMode}>
        {mode === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
      </button>
      </div> 
    </header>
  );
};

export default Header;
