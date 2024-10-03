import React, { useState } from 'react';

const AboutUsModule = () => {
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(`Welcome to Vistral! We're an AI-powered platform supporting therapists. How can I assist you today?`);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAiResponse("Processing your question...");
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Thank you for your interest in Vistral! Regarding your question: "${question}"

Vistral is committed to revolutionizing mental health care through AI-assisted therapy tools. Our mission is to empower therapists with cutting-edge technology to provide better care for their patients.`);
    }, 1500);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p className="mb-4">Vistral: AI in support of therapists</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={question} onChange={handleInputChange} placeholder="Ask us anything about Vistral" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ask</button>
      </form>
      {aiResponse && <p className="mt-4 text-green-600 whitespace-pre-line">{aiResponse}</p>}
    </div>
  );
};

export default AboutUsModule;