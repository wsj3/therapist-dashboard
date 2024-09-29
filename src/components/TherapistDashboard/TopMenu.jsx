import React from 'react';
import { UserPlus, LogIn, HelpCircle, PlayCircle, Info } from 'lucide-react';

const TopMenu = () => {
  return (
    <nav className="flex items-center space-x-4">
      <a href="/signup" className="text-blue-100 hover:text-white" title="Sign Up">
        <UserPlus size={24} />
      </a>
      <a href="/login" className="text-blue-100 hover:text-white" title="Login">
        <LogIn size={24} />
      </a>
      <a href="/help" className="text-blue-100 hover:text-white" title="Help">
        <HelpCircle size={24} />
      </a>
      <a href="/getting-started" className="text-blue-100 hover:text-white" title="Getting Started">
        <PlayCircle size={24} />
      </a>
      <a href="/about-us" className="text-blue-100 hover:text-white" title="About Us">
        <Info size={24} />
      </a>
    </nav>
  );
};

export default TopMenu;