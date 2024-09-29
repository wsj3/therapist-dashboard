"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Phone, Download, MessageSquare, Brain, Bot } from 'lucide-react';

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    console.log('VideoChat component mounted');
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopVideo = () => {
    [localVideoRef, remoteVideoRef].forEach(ref => {
      if (ref.current && ref.current.srcObject) {
        const stream = ref.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        ref.current.srcObject = null;
      }
    });
    setIsCallActive(false);
  };

  const toggleCall = () => {
    if (isCallActive) {
      stopVideo();
    } else {
      startVideo();
    }
  };

  const startRecording = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const recorder = new MediaRecorder(localVideoRef.current.srcObject);
      setMediaRecorder(recorder);
      setRecordedChunks([]);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'recorded-session.webm';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Video Chat</h3>
      <div className="flex justify-between" style={{gap: '20px'}}>
        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center" style={{width: '50%'}}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {!isCallActive && <div className="absolute">Local Video</div>}
        </div>
        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center" style={{width: '50%'}}>
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {!isCallActive && <div className="absolute">Remote Video</div>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={toggleCall}
          className={`px-4 py-2 rounded ${
            isCallActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          <Phone className="inline-block mr-2" size={18} />
          {isCallActive ? 'End Call' : 'Start Call'}
        </button>
        <button 
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded ${
            isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}
          disabled={!isCallActive}
        >
          <Video className="inline-block mr-2" size={18} />
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button 
          onClick={downloadRecording} 
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={recordedChunks.length === 0}
        >
          <Download className="inline-block mr-2" size={18} />
          Download Recording
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded">
          <MessageSquare className="inline-block mr-2" size={18} />
          Transcribe Session
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded">
          <Brain className="inline-block mr-2" size={18} />
          Sentiment Analysis
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded">
          <Bot className="inline-block mr-2" size={18} />
          AI Assistant
        </button>
      </div>
    </div>
  );
};

export default VideoChat;