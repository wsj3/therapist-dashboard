import React, { useState } from 'react';
import { Calendar as CalendarIcon, Video, BarChart, DollarSign, Users, Mail, FileText, Stethoscope, Settings as SettingsIcon } from 'lucide-react';
import TopMenu from './TopMenu';

// Import module components
import CalendarModule from './Calendar';
import CustomerManager from './CustomerManager';
import Email from './Email';
import InsuranceBilling from './InsuranceBilling';
import NotesAndTranscription from './NotesAndTranscription';
import SentimentAnalysis from './SentimentAnalysis';
import VideoChat from './VideoChat';
import DiagnosisTreatment from './DiagnosisTreatment';
import Settings from './Settings';

// Import top menu modules
import SignUpModule from './SignUpModule';
import LoginModule from './LoginModule';
import HelpModule from './HelpModule';
import GettingStartedModule from './GettingStartedModule';
import AboutUsModule from './AboutUsModule';

const TherapistDashboard = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [activeTopMenu, setActiveTopMenu] = useState(null);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        return <div>Welcome to the Therapist Dashboard</div>;
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
      case 'gettingstarted':
        return <GettingStartedModule />;
      case 'aboutus':
        return <AboutUsModule />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="https://i.imgur.com/u7DNbbP.jpeg" alt="Vistral Logo" className="w-10 h-10 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">Vistral</h1>
            <p className="text-sm text-gray-400">AI in support of therapists</p>
          </div>
        </div>
        <TopMenu setActiveTopMenu={setActiveTopMenu} />
      </header>

      <main className="flex-grow flex">
        <aside className="w-64 bg-gray-800 p-4">
          <nav>
            <ul className="space-y-2">
              {[
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
                    onClick={() => {setActiveModule(key); setActiveTopMenu(null);}}
                    className={`w-full flex items-center space-x-2 p-2 rounded ${
                      activeModule === key ? 'bg-green-500' : 'hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="flex-grow p-8">
          <h2 className="text-3xl font-bold mb-6">Therapist Dashboard</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {activeTopMenu ? renderTopMenuContent() : renderModuleContent()}
          </div>

          {assistantResponse && (
            <div className="mt-6 p-4 bg-gray-800 border-l-4 border-green-500 rounded-lg">
              <p className="font-semibold text-green-400">AI Assistant:</p>
              <p className="mt-2">{assistantResponse}</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-800 p-4">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>AI Assistant</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAIEnabled}
              onChange={toggleAI}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
        {isAIEnabled && (
          <form onSubmit={handleTextInputSubmit} className="flex">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Ask AI Assistant..."
              className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}
      </footer>
    </div>
  );
};

export default TherapistDashboard;