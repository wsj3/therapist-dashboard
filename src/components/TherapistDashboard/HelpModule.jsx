import React, { useState } from 'react';

const HelpModule = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAiResponse("Analyzing your question...");
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Here's a possible solution to your question: "${query}"\n\nPlease check our FAQ section or contact support if you need more assistance.`);
    }, 1500);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Help Center</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={query} onChange={handleInputChange} placeholder="How can we help you?" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Get Help</button>
      </form>
      {aiResponse && <p className="mt-4 text-green-600 whitespace-pre-line">{aiResponse}</p>}
    </div>
  );
};

export default HelpModule;