import React, { useState } from 'react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('businessRules');
  const [businessRules, setBusinessRules] = useState('');
  const [medicalDatabases, setMedicalDatabases] = useState('');
  const [structuredGuidance, setStructuredGuidance] = useState('');
  const [aiAssistant, setAiAssistant] = useState('');

  const handleSave = (section) => {
    // Here you would typically send the data to your backend
    console.log(`Saving ${section}:`, eval(section));
    // Add your API call here
  };

  const renderSection = (title, state, setState) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => handleSave(state)}
      >
        Save {title}
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="mb-6">
        <div className="flex space-x-4">
          {['Business Rules', 'Medical Databases', 'Structured Guidance', 'AI Assistant'].map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded ${
                activeSection === section.toLowerCase().replace(' ', '') 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveSection(section.toLowerCase().replace(' ', ''))}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
      
      {activeSection === 'businessRules' && renderSection('Business Rules', businessRules, setBusinessRules)}
      {activeSection === 'medicaldatabases' && renderSection('Medical Databases', medicalDatabases, setMedicalDatabases)}
      {activeSection === 'structuredguidance' && renderSection('Structured Guidance', structuredGuidance, setStructuredGuidance)}
      {activeSection === 'aiassistant' && renderSection('AI Assistant', aiAssistant, setAiAssistant)}
    </div>
  );
};

export default Settings;