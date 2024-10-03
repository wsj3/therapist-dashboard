import React, { useState } from 'react';

const LoginModule = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [aiResponse, setAiResponse] = useState('');

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAiResponse("Verifying your credentials...");
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Login successful! Welcome back, ${credentials.email}.`);
    }, 1500);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
      {aiResponse && <p className="mt-4 text-green-600">{aiResponse}</p>}
    </div>
  );
};

export default LoginModule;