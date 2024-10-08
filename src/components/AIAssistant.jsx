import React, { useEffect, useRef, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import io from 'socket.io-client';

const AIAssistant = ({ isEnabled }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const { user } = useUser();
  const { isRecording, startRecording, stopRecording, audioData } = useAudioRecorder();
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (isEnabled && !socketRef.current) {
      socketRef.current = io('/api/ai-assistant');

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        socketRef.current.emit('start_session');
      });

      socketRef.current.on('ai_message', (message) => {
        setMessages(prev => [...prev, { role: 'assistant', content: message }]);
      });

      socketRef.current.on('ai_audio', (audioData) => {
        playAudio(audioData);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [isEnabled]);

  useEffect(() => {
    if (audioData) {
      socketRef.current.emit('send_audio', audioData);
    }
  }, [audioData]);

  const playAudio = (base64Audio) => {
    const audioBlob = new Blob([Buffer.from(base64Audio, 'base64')], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;
    audioRef.current.play();
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <div className="h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'assistant' ? 'text-green-500' : 'text-blue-500'}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`w-full py-2 px-4 rounded ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default AIAssistant;