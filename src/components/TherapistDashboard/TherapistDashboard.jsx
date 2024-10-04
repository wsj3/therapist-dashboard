import React, { useState } from 'react';
import { Calendar as CalendarIcon, Video, BarChart, DollarSign, Users, Mail, FileText, Stethoscope, Settings as SettingsIcon, Menu as MenuIcon, X as CloseIcon, Home as HomeIcon, Bell as BellIcon, User as UserIcon, HelpCircle as HelpIcon } from 'lucide-react';
import useIsMobile from '../../hooks/useIsMobile';

// Sub-components
const TopMenu = ({ setActiveTopMenu }) => (
  <div className="flex items-center space-x-4">
    <button onClick={() => setActiveTopMenu('notifications')} className="text-gray-300 hover:text-white">
      <BellIcon size={20} />
    </button>
    <button onClick={() => setActiveTopMenu('profile')} className="text-gray-300 hover:text-white">
      <UserIcon size={20} />
    </button>
    <button onClick={() => setActiveTopMenu('help')} className="text-gray-300 hover:text-white">
      <HelpIcon size={20} />
    </button>
  </div>
);

const CalendarModule = () => <div>Calendar Module Content</div>;
const CustomerManager = () => <div>Customer Manager Content</div>;
const Email = () => <div>Email Module Content</div>;
const InsuranceBilling = () => <div>Insurance Billing Content</div>;
const NotesAndTranscription = () => <div>Notes and Transcription Content</div>;
const SentimentAnalysis = () => <div>Sentiment Analysis Content</div>;
const VideoChat = () => <div>Video Chat Module Content</div>;
const DiagnosisTreatment = () => <div>Diagnosis and Treatment Content</div>;
const Settings = () => <div>Settings Module Content</div>;

const SignUpModule = () => <div>Sign Up Module Content</div>;
const LoginModule = () => <div>Login Module Content</div>;
const HelpModule = () => <div>Help Module Content</div>;
const GettingStartedModule = () => <div>Getting Started Module Content</div>;

const AboutUsModule = ({ onClose }) => (
  <div className="p-4 bg-gray-700 rounded-lg">
    <h2 className="text-xl font-bold mb-4">About Vistral AI</h2>
    <p className="mb-4">
      Vistral AI is dedicated to supporting therapists with cutting-edge AI technology. 
      Our mission is to enhance the capabilities of mental health professionals through 
      innovative tools and solutions.
    </p>
    <button 
      onClick={onClose}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      Close
    </button>
  </div>
);

const TherapistDashboard = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [activeTopMenu, setActiveTopMenu] = useState(null);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
    if (!isAIEnabled) {
      setAssistantResponse('AI Assistant enabled. How can I help you?');
    } else {
      setAssistantResponse('');
    }
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleTextInputSubmit = async (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: textInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      setAssistantResponse(data.response);
    } catch (error) {
      console.error('Error querying AI:', error);
      setAssistantResponse('Sorry, I encountered an error while processing your request.');
    } finally {
      setIsLoading(false);
      setTextInput('');
    }
  };

  const toggleAboutUs = () => {
    setShowAboutUs(!showAboutUs);
    setActiveTopMenu(null);
    setActiveModule('home');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'calendar':
        return <CalendarModule />;
      case 'crm':
        return <CustomerManager />;
      case 'email':
        return <Email />;
      case 'billing':
        return <InsuranceBilling />;
      case 'notes':
        return <NotesAndTranscription />;
      case 'sentiment':
        return <SentimentAnalysis />;
      case 'video':
        return <VideoChat />;
      case 'diagnosis':
        return <DiagnosisTreatment />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Welcome to your dashboard!</h3>
            <p>
              Vistral AI is a non-profit organization which has a focus on providing resources 
              to help therapists improve outcomes and improve their workflow processes.
            </p>
            <p>
              We do this by providing an interactive AI Assistant who can help with both 
              managing your day-to-day operations as well as assist in the diagnosis and 
              treatment of your clients.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">How Vistral AI Can Help You</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Streamline your daily operations with AI-powered management tools</li>
                <li>Get assistance in client diagnosis and treatment planning</li>
                <li>Access resources to improve therapy outcomes</li>
                <li>Enhance your workflow efficiency with intelligent automation</li>
              </ul>
            </div>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Getting Started</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Explore the Calendar module to manage your appointments</li>
                <li>Use the Customers section to organize client information</li>
                <li>Try the AI Assistant for quick answers and support</li>
                <li>Check out the Diagnosis module for treatment assistance</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  const renderTopMenuContent = () => {
    switch (activeTopMenu) {
      case 'signup':
        return <SignUpModule />;
      case 'login':
        return <LoginModule />;
      case 'help':
        return <HelpModule />;
      case 'gettingStarted':
        return <GettingStartedModule />;
      default:
        return null;
    }
  };

  const renderSidebarContent = () => (
    <nav className="h-full">
      <ul className="space-y-4">
        {[
          { name: 'Home', icon: HomeIcon, key: 'home' },
          { name: 'Calendar', icon: CalendarIcon, key: 'calendar' },
          { name: 'Customers', icon: Users, key: 'crm' },
          { name: 'Email', icon: Mail, key: 'email' },
          { name: 'Billing', icon: DollarSign, key: 'billing' },
          { name: 'Notes', icon: FileText, key: 'notes' },
          { name: 'Analysis', icon: BarChart, key: 'sentiment' },
          { name: 'Video Chat', icon: Video, key: 'video' },
          { name: 'Diagnosis', icon: Stethoscope, key: 'diagnosis' },
          { name: 'Settings', icon: SettingsIcon, key: 'settings' },
        ].map(({ name, icon: Icon, key }) => (
          <li key={key}>
            <button
              onClick={() => {setActiveModule(key); setActiveTopMenu(null); isMobile && setIsMenuOpen(false);}}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left ${
                activeModule === key ? 'bg-green-500 text-white' : 'hover:bg-gray-700'
              }`}
            >
              <Icon size={24} />
              <span className="text-lg">{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <button onClick={toggleMenu} className="text-white p-2">
              <MenuIcon size={28} />
            </button>
          )}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={toggleAboutUs}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                toggleAboutUs();
              }
            }}
          >
            <img src="https://i.imgur.com/u7DNbbP.jpeg" alt="Vistral Logo" className="w-10 h-10 rounded-full" />
            <div>
              <h1 className="text-xl font-bold">Vistral</h1>
              <p className="text-xs text-gray-400">AI for therapists</p>
            </div>
          </div>
        </div>
        {!isMobile && <TopMenu setActiveTopMenu={setActiveTopMenu} />}
      </header>

      <main className="flex-grow flex relative">
        {(!isMobile || isMenuOpen) && (
          <aside className={`${
            isMobile 
              ? 'fixed inset-0 z-50 bg-gray-900 bg-opacity-95' 
              : 'w-64 border-r border-gray-700'
          } overflow-y-auto`}>
            <div className="p-4">
              {isMobile && (
                <button onClick={toggleMenu} className="mb-4 text-gray-400 hover:text-white">
                  <CloseIcon size={24} />
                </button>
              )}
              {renderSidebarContent()}
            </div>
          </aside>
        )}

        <section className={`flex-grow p-4 ${isMobile ? 'pb-20' : ''}`}>
          <h2 className="text-2xl font-bold mb-4">{activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}</h2>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            {showAboutUs ? (
              <AboutUsModule onClose={() => setShowAboutUs(false)} />
            ) : activeTopMenu ? (
              renderTopMenuContent()
            ) : (
              renderModuleContent()
            )}
          </div>

          {assistantResponse && (
            <div className="mt-4 p-4 bg-gray-800 border-l-4 border-green-500 rounded-lg">
              <p className="font-semibold text-green-400">AI Assistant:</p>
              <p className="mt-2 text-sm">{assistantResponse}</p>
            </div>
          )}
        </section>
      </main>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg">
          <ul className="flex justify-around p-2">
            {[
              { icon: HomeIcon, key: 'home' },
              { icon: CalendarIcon, key: 'calendar' },
              { icon: Users, key: 'crm' },
              { icon: SettingsIcon, key: 'settings' },
            ].map(({ icon: Icon, key }) => (
              <li key={key}>
                <button
                  onClick={() => setActiveModule(key)}
                  className={`p-2 rounded-full ${activeModule === key ? 'bg-green-500' : ''}`}
                >
                  <Icon size={24} />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {isAIEnabled && (
        <footer className={`bg-gray-800 p-4 ${isMobile ? 'pb-20' : ''}`}>
          <form onSubmit={handleTextInputSubmit} className="flex">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Ask AI Assistant..."
              className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </footer>
      )}
    </div>
  );
};

export default TherapistDashboard;