"use client";

import React, { useState, useRef } from 'react';
import { BarChart, Smile, Meh, Frown, Upload, Loader } from 'lucide-react';

const SentimentAnalysis = ({ aiEnabled }) => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    // Simulating API call for sentiment analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    const score = Math.random();
    if (score > 0.6) {
      setSentiment('positive');
    } else if (score > 0.4) {
      setSentiment('neutral');
    } else {
      setSentiment('negative');
    }
    setIsAnalyzing(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsAnalyzing(true);
      // Simulating file processing and transcription
      await new Promise(resolve => setTimeout(resolve, 2000));
      const simulatedTranscription = `Transcription of ${file.type.includes('audio') ? 'audio' : 'video'} file:\n\nClient: I've been feeling overwhelmed lately...\nTherapist: I understand. Can you tell me more about what's causing these feelings?`;
      setText(simulatedTranscription);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze or upload a file..."
      />
      <div className="flex space-x-2">
        <button
          onClick={analyzeSentiment}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          disabled={isAnalyzing || !text.trim()}
        >
          {isAnalyzing ? <Loader className="animate-spin mr-2" size={18} /> : <BarChart className="mr-2" size={18} />}
          Analyze Sentiment
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="audio/*,video/*"
          style={{ display: 'none' }}
        />
        <button 
          onClick={() => fileInputRef.current.click()} 
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          disabled={isAnalyzing}
        >
          <Upload className="mr-2" size={18} />
          Upload File
        </button>
      </div>
      {sentiment && (
        <div className="mt-4">
          <p className="font-semibold">Sentiment Analysis Result:</p>
          <div className="flex items-center mt-2">
            {sentiment === 'positive' && <Smile className="text-green-500 mr-2" size={24} />}
            {sentiment === 'neutral' && <Meh className="text-yellow-500 mr-2" size={24} />}
            {sentiment === 'negative' && <Frown className="text-red-500 mr-2" size={24} />}
            <span className="capitalize">{sentiment}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;