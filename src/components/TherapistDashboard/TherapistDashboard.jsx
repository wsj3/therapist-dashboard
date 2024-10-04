import React, { useState } from 'react';
import { Calendar, Users, Mail, DollarSign, FileText, BarChart, Video, Stethoscope, Settings, Home, LogIn, UserPlus, Info, Phone, HelpCircle, ToggleLeft, ToggleRight } from 'lucide-react';

const TopMenu = ({ setActiveTopMenu, isAIEnabled, toggleAI }) => (
  <div className="flex items-center space-x-4">
    {[
      { key: 'login', icon: LogIn, tooltip: 'Login' },
      { key: 'signup', icon: UserPlus, tooltip: 'Sign Up' },
      { key: 'aboutUs', icon: Info, tooltip: 'About Us' },
      { key: 'contactUs', icon: Phone, tooltip: 'Contact Us' },
      { key: 'help', icon: HelpCircle, tooltip: 'Help' },
    ].map(({ key, icon: Icon, tooltip }) => (
      <button
        key={key}
        onClick={() => setActiveTopMenu(key)}
        className="text-gray-300 hover:text-white relative group"
      >
        <Icon size={20} />
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {tooltip}
        </span>
      </button>
    ))}
    <button
      onClick={toggleAI}
      className={`relative group flex items-center ${
        isAIEnabled ? 'text-green-500' : 'text-red-500'
      } hover:text-white transition-colors duration-300`}
    >
      {isAIEnabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
      <span className="ml-2">AI Assistant</span>
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isAIEnabled ? 'Disable AI Assistant' : 'Enable AI Assistant'}
      </span>
    </button>
  </div>
);

const TherapistDashboard = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [activeTopMenu, setActiveTopMenu] = useState(null);
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  const toggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'home':
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Welcome to Your Dashboard</h3>
            <p className="mb-4">Select a module from the sidebar to get started.</p>
            <h4 className="text-lg font-semibold mb-2">Resources We Utilize to Build Our Model</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>127 Structured Guidance Rules</li>
              <li>1505 Business Rules</li>
              <li>109 Medical Databases</li>
              <li>102 Best Practices</li>
            </ul>
            <p>Follow our engagement on social media. Our channels contain much more information on the resources we bring to business.</p>
          </div>
        );
      // Add other cases for different modules
      default:
        return <div>{activeModule} content</div>;
    }
  };

  const sidebarItems = [
    { name: 'Home', icon: Home, key: 'home' },
    { name: 'Calendar', icon: Calendar, key: 'calendar' },
    { name: 'Customer Manager', icon: Users, key: 'crm' },
    { name: 'Email', icon: Mail, key: 'email' },
    { name: 'Insurance Billing', icon: DollarSign, key: 'billing' },
    { name: 'Notes & Transcription', icon: FileText, key: 'notes' },
    { name: 'Sentiment Analysis', icon: BarChart, key: 'sentiment' },
    { name: 'Video Chat', icon: Video, key: 'video' },
    { name: 'Diagnosis & Treatment', icon: Stethoscope, key: 'diagnosis' },
    { name: 'Settings', icon: Settings, key: 'settings' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://i.imgur.com/u7DNbbP.jpeg" alt="Vistral Logo" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h1 className="text-xl font-bold">Vistral</h1>
            <p className="text-xs text-gray-400">AI for therapists</p>
          </div>
        </div>
        <TopMenu setActiveTopMenu={setActiveTopMenu} isAIEnabled={isAIEnabled} toggleAI={toggleAI} />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-800 p-4 overflow-y-auto">
          <nav>
            {sidebarItems.map(({ name, icon: Icon, key }) => (
              <button
                key={key}
                onClick={() => setActiveModule(key)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left mb-2 ${
                  activeModule === key ? 'bg-green-500 text-white' : 'hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span>{name}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-gray-900 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">{activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            {renderModuleContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TherapistDashboard;