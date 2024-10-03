import React from 'react';
import { UserPlus, LogIn, HelpCircle, PlayCircle, Info } from 'lucide-react';

const TopMenu = ({ setActiveTopMenu }) => {
  return (
    <nav className="flex items-center space-x-4">
      <button 
        onClick={() => setActiveTopMenu('signup')} 
        className="text-blue-100 hover:text-white" 
        title="Sign Up"
      >
        <UserPlus size={24} />
      </button>
      <button 
        onClick={() => setActiveTopMenu('login')} 
        className="text-blue-100 hover:text-white" 
        title="Login"
      >
        <LogIn size={24} />
      </button>
      <button 
        onClick={() => setActiveTopMenu('help')} 
        className="text-blue-100 hover:text-white" 
        title="Help"
      >
        <HelpCircle size={24} />
      </button>
      <button 
        onClick={() => setActiveTopMenu('gettingstarted')} 
        className="text-blue-100 hover:text-white" 
        title="Getting Started"
      >
        <PlayCircle size={24} />
      </button>
      <button 
        onClick={() => setActiveTopMenu('aboutus')} 
        className="text-blue-100 hover:text-white" 
        title="About Us"
      >
        <Info size={24} />
      </button>
    </nav>
  );
};

export default TopMenu;