import React, { useState } from 'react';

const AboutUsModule = ({ onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error querying AI:', error);
      setAnswer('Sorry, I encountered an error while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">About Vistral AI</h2>
      <p className="mb-4">
        Vistral AI is dedicated to supporting therapists with cutting-edge AI technology. 
        Our mission is to enhance the capabilities of mental health professionals through 
        innovative tools and solutions.
      </p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Ask AI</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Ask a question about Vistral AI..."
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Asking AI...' : 'Ask AI'}
          </button>
        </form>
        {answer && (
          <div className="mt-4 p-4 bg-gray-600 rounded-md">
            <p className="font-semibold">AI Response:</p>
            <p className="mt-2">{answer}</p>
          </div>
        )}
      </div>
      <button 
        onClick={onClose}
        className="mt-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default AboutUsModule;