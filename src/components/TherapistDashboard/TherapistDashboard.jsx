import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Video, BarChart, DollarSign, Users, Mail, FileText, Mic, Stethoscope, Settings as SettingsIcon } from 'lucide-react';
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

const API_BASE_URL = 'http://127.0.0.1:8000';

const TherapistDashboard = () => {
  const [activeModule, setActiveModule] = useState('calendar');
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isToggling, setIsToggling] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleAI = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      const endpoint = isAIEnabled ? '/stop_speech_interaction' : '/start_speech_interaction';
      console.log(`Sending request to: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: 'POST' });
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      if (response.ok) {
        setIsAIEnabled(!isAIEnabled);
        if (!isAIEnabled) {
          setAssistantResponse('AI Assistant enabled. How can I help you?');
        } else {
          setAssistantResponse('');
        }
      } else {
        console.error('Failed to toggle assistant:', responseData);
      }
    } catch (error) {
      console.error('Error toggling assistant:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const startSpeechInteraction = async () => {
    if (isAIEnabled && !isSpeaking) {
      setIsSpeaking(true);
      try {
        const response = await fetch(`${API_BASE_URL}/start_speech_interaction`, { method: 'POST' });
        if (response.ok) {
          pollSpeechResponse();
        } else {
          console.error('Failed to start speech interaction');
        }
      } catch (error) {
        console.error('Error starting speech interaction:', error);
      }
    }
  };

  const stopSpeechInteraction = async () => {
    try {
      await fetch(`${API_BASE_URL}/stop_speech_interaction`, { method: 'POST' });
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error stopping speech interaction:', error);
    }
  };

  const pollSpeechResponse = async () => {
    while (isSpeaking) {
      try {
        const response = await fetch(`${API_BASE_URL}/get_speech_response`);
        const data = await response.json();
        if (data.response) {
          setAssistantResponse(prevResponse => prevResponse + '\n' + data.response);
        }
        if (data.finished) {
          setIsSpeaking(false);
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Poll every second
      } catch (error) {
        console.error('Error polling speech response:', error);
        setIsSpeaking(false);
        break;
      }
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
        return <div>Select a module from the sidebar</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-600 text-white p-2 flex items-center justify-between">
        <div className="flex items-center">
          <img src="https://i.imgur.com/u7DNbbP.jpeg" alt="Vistral Logo" className="w-8 h-8 mr-2" />
          <div>
            <h1 className="text-xl font-bold leading-tight">Vistral</h1>
            <p className="text-xs">AI in support of therapists</p>
          </div>
        </div>
        <TopMenu />
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-blue-700 shadow-md flex flex-col">
          <ul className="flex-grow pt-2">
            {[
              { name: 'Calendar', icon: CalendarIcon, key: 'calendar' },
              { name: 'Customer Manager', icon: Users, key: 'crm' },
              { name: 'Email', icon: Mail, key: 'email' },
              { name: 'Insurance Billing', icon: DollarSign, key: 'billing' },
              { name: 'Notes & Transcription', icon: FileText, key: 'notes' },
              { name: 'Sentiment Analysis', icon: BarChart, key: 'sentiment' },
              { name: 'Video Chat', icon: Video, key: 'video' },
              { name: 'Diagnosis & Treatment', icon: Stethoscope, key: 'diagnosis' },
              { name: 'Settings', icon: SettingsIcon, key: 'settings' },
            ].map(({ name, icon: Icon, key }) => (
              <li
                key={key}
                className={`p-2 hover:bg-blue-600 cursor-pointer ${
                  activeModule === key ? 'bg-blue-800 text-white' : 'text-blue-100'
                }`}
                onClick={() => setActiveModule(key)}
              >
                <Icon className="inline-block mr-2" size={16} /> {name}
              </li>
            ))}
          </ul>
          <div className="p-4 border-t border-blue-600">
            <div className="flex items-center justify-between text-blue-100">
              <span className="mr-2 font-semibold">AI Assistant</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isAIEnabled}
                  onChange={toggleAI}
                  disabled={isToggling}
                />
                <div className={`w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400 ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
              </label>
            </div>
            {isAIEnabled && (
              <div className="mt-2 text-center text-blue-200">
                <div className="animate-pulse flex items-center justify-center">
                  <Mic size={20} className="mr-2" />
                  <span>AI Assistant Active</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Therapist Dashboard</h2>
          
          {/* Render active module content */}
          {renderModuleContent()}

          {/* Speech interaction buttons */}
          <div className="mt-4">
            {isAIEnabled ? (
              <>
                <button
                  onClick={startSpeechInteraction}
                  disabled={isSpeaking}
                  className={`px-4 py-2 rounded ${
                    isSpeaking ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-bold mr-2`}
                >
                  {isSpeaking ? 'Listening...' : 'Start Speaking'}
                </button>
                {isSpeaking && (
                  <button
                    onClick={stopSpeechInteraction}
                    className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-bold"
                  >
                    Stop Speaking
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-600 italic">Enable AI Assistant to use speech interaction</p>
            )}
          </div>

          {/* AI Assistant response */}
          {assistantResponse && (
            <div className="mt-4 p-4 bg-white border-l-4 border-green-500 rounded-r-lg shadow-md">
              <p className="font-semibold text-green-600">AI Assistant:</p>
              <p className="whitespace-pre-line">{assistantResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;