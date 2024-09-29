"use client";

import React, { useState, useRef } from 'react';
import { Save, Trash2, Edit, Mic, Video, FileText, Loader } from 'lucide-react';

const NotesAndTranscription = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '', transcription: '' });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const fileInputRef = useRef(null);

  const saveNote = () => {
    if (currentNote.id) {
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
    } else {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
    }
    setCurrentNote({ id: null, title: '', content: '', transcription: '' });
  };

  const editNote = (note) => {
    setCurrentNote(note);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startRecording = (type) => {
    setIsRecording(true);
    setRecordingType(type);
    // In a real application, you would start actual recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    transcribeRecording();
  };

  const transcribeRecording = () => {
    setIsTranscribing(true);
    // Simulating transcription process
    setTimeout(() => {
      const simulatedTranscription = `Transcription of ${recordingType} session:\n\n` +
        `Therapist: Hello, how are you feeling today?\n\n` +
        `Client: I'm feeling a bit anxious about work, but overall I'm doing okay.\n\n` +
        `Therapist: I see. Can you tell me more about what's causing your anxiety at work?\n\n` +
        `Client: Well, we have a big project coming up and I'm worried about meeting the deadline...`;

      setCurrentNote(prevNote => ({
        ...prevNote,
        title: `${recordingType.charAt(0).toUpperCase() + recordingType.slice(1)} Session Transcription`,
        transcription: simulatedTranscription
      }));
      setIsTranscribing(false);
      setRecordingType(null);
    }, 2000); // Simulating transcription time
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsTranscribing(true);
      // Simulating processing of uploaded file
      setTimeout(() => {
        const simulatedTranscription = `Transcription of uploaded ${file.type.includes('audio') ? 'audio' : 'video'} file:\n\n` +
          `Therapist: In our last session, we discussed your goals for managing stress. How have you been implementing those strategies?\n\n` +
          `Client: I've been trying the breathing exercises we talked about. They seem to help when I'm feeling overwhelmed...\n\n` +
          `Therapist: That's great to hear. Let's dive deeper into how we can build on this progress...`;

        setCurrentNote({
          id: null,
          title: `Transcription from Uploaded ${file.type.includes('audio') ? 'Audio' : 'Video'}`,
          content: '',
          transcription: simulatedTranscription
        });
        setIsTranscribing(false);
      }, 2000); // Simulating processing time
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notes & Transcription</h3>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Note Title"
          value={currentNote.title}
          onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Note Content"
          value={currentNote.content}
          onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
          className="w-full p-2 border rounded"
          rows="4"
        />
        {currentNote.transcription && (
          <div className="mt-4">
            <h4 className="font-semibold">Transcription:</h4>
            <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded mt-2">
              {currentNote.transcription}
            </pre>
          </div>
        )}
        <div className="flex space-x-2">
          <button onClick={saveNote} className="flex-1 bg-green-500 text-white p-2 rounded flex items-center justify-center">
            <Save size={18} className="mr-2" /> Save Note
          </button>
          <button 
            onClick={() => startRecording('audio')} 
            className={`p-2 rounded ${isRecording && recordingType === 'audio' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            disabled={isRecording && recordingType !== 'audio'}
          >
            <Mic size={18} />
          </button>
          <button 
            onClick={() => startRecording('video')} 
            className={`p-2 rounded ${isRecording && recordingType === 'video' ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            disabled={isRecording && recordingType !== 'video'}
          >
            <Video size={18} />
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
            className="p-2 rounded bg-purple-500 text-white"
          >
            <FileText size={18} />
          </button>
        </div>
        {isRecording && (
          <button onClick={stopRecording} className="w-full bg-red-500 text-white p-2 rounded">
            Stop Recording and Transcribe
          </button>
        )}
        {isTranscribing && (
          <div className="flex items-center justify-center space-x-2 text-blue-500">
            <Loader className="animate-spin" size={18} />
            <span>Transcribing...</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {notes.map(note => (
          <div key={note.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{note.title}</h4>
              <div>
                <button onClick={() => editNote(note)} className="text-blue-500 mr-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteNote(note.id)} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            {note.content && <p className="mt-2 whitespace-pre-wrap">{note.content}</p>}
            {note.transcription && (
              <div className="mt-2">
                <h5 className="font-semibold">Transcription:</h5>
                <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded mt-1">
                  {note.transcription}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesAndTranscription;