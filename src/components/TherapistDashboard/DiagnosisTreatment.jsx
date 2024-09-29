import React, { useState, useEffect } from 'react';

const DiagnosisTreatment = () => {
  const [activeTab, setActiveTab] = useState('diagnose');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patients, setPatients] = useState([]);
  const [diagnosisMethod, setDiagnosisMethod] = useState('');
  const [treatmentMethod, setTreatmentMethod] = useState('');
  const [recommendationMethod, setRecommendationMethod] = useState('');
  const [diagnosisFile, setDiagnosisFile] = useState(null);
  const [treatmentAction, setTreatmentAction] = useState('');
  const [recommendationAction, setRecommendationAction] = useState('');

  useEffect(() => {
    // Simulated API call to fetch patients
    setPatients([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Alice Johnson' },
    ]);
  }, []);

  const renderPatientSelection = () => (
    <div className="mb-4">
      <h4 className="font-medium mb-2">Select Patient:</h4>
      <select
        className="w-full p-2 border rounded"
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
      >
        <option value="">Select a patient</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.name}
          </option>
        ))}
      </select>
    </div>
  );

  const renderFileSelection = (method, file, setFile) => (
    <div>
      <h4 className="font-medium mb-2">
        Select or Upload {method}:
      </h4>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {/* Implement select functionality */}}
        >
          Select Existing
        </button>
        <label className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
          Upload New
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>
      {file && (
        <p className="mt-2">Selected file: {file.name}</p>
      )}
    </div>
  );

  const renderActionButtons = (action, setAction) => (
    <div>
      <h4 className="font-medium mb-2">Select Action:</h4>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            action === 'generate' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setAction('generate')}
        >
          Generate
        </button>
        <button
          className={`px-4 py-2 rounded ${
            action === 'collaborate' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setAction('collaborate')}
        >
          Collaborate
        </button>
      </div>
    </div>
  );

  const renderActionContent = (method, action) => (
    <>
      {action === 'generate' && (
        <div>
          <h4 className="font-medium mb-2">Generate {method}:</h4>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {/* Implement generate functionality */}}
          >
            Start Generation
          </button>
        </div>
      )}
      {action === 'collaborate' && (
        <div>
          <h4 className="font-medium mb-2">Collaborate on {method}:</h4>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder={`Enter your ${method} ideas here...`}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {/* Implement collaborate functionality */}}
          >
            Start Collaboration
          </button>
        </div>
      )}
    </>
  );

  const renderDiagnoseContent = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Diagnose</h3>
      {renderPatientSelection()}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Select Diagnosis Method:</h4>
          <select
            className="w-full p-2 border rounded"
            value={diagnosisMethod}
            onChange={(e) => setDiagnosisMethod(e.target.value)}
          >
            <option value="">Select a method</option>
            <option value="session">Session</option>
            <option value="transcription">Transcription</option>
            <option value="notes">Notes</option>
          </select>
        </div>
        {diagnosisMethod && renderFileSelection(diagnosisMethod, diagnosisFile, setDiagnosisFile)}
      </div>
    </div>
  );

  const renderTreatmentContent = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Treatment</h3>
      {renderPatientSelection()}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Select Treatment Method:</h4>
          <select
            className="w-full p-2 border rounded"
            value={treatmentMethod}
            onChange={(e) => setTreatmentMethod(e.target.value)}
          >
            <option value="">Select a method</option>
            <option value="plan">Plan</option>
            <option value="analysis">Analysis</option>
            <option value="research">Research</option>
          </select>
        </div>
        {treatmentMethod && renderActionButtons(treatmentAction, setTreatmentAction)}
        {treatmentAction && renderActionContent(treatmentMethod, treatmentAction)}
      </div>
    </div>
  );

  const renderRecommendationContent = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Recommendation</h3>
      {renderPatientSelection()}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Select Recommendation Method:</h4>
          <select
            className="w-full p-2 border rounded"
            value={recommendationMethod}
            onChange={(e) => setRecommendationMethod(e.target.value)}
          >
            <option value="">Select a method</option>
            <option value="lifestyle">Lifestyle Changes</option>
            <option value="medication">Medication</option>
            <option value="therapy">Therapy Approach</option>
          </select>
        </div>
        {recommendationMethod && renderActionButtons(recommendationAction, setRecommendationAction)}
        {recommendationAction && renderActionContent(recommendationMethod, recommendationAction)}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Diagnosis, Treatment & Recommendation</h2>
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'diagnose' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('diagnose')}
        >
          Diagnose
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'treatment' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('treatment')}
        >
          Treatment
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'recommendation' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('recommendation')}
        >
          Recommendation
        </button>
      </div>
      {activeTab === 'diagnose' && renderDiagnoseContent()}
      {activeTab === 'treatment' && renderTreatmentContent()}
      {activeTab === 'recommendation' && renderRecommendationContent()}
    </div>
  );
};

export default DiagnosisTreatment;