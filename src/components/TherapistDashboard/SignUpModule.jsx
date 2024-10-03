import React, { useState } from 'react';

const SignUpModule = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [aiResponse, setAiResponse] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAiResponse("Processing your sign-up request...");
    // Simulate AI processing
    setTimeout(() => {
      setAiResponse(`Welcome, ${formData.name}! Your account has been created. We've sent a confirmation email to ${formData.email}.`);
    }, 1500);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
      {aiResponse && <p className="mt-4 text-green-600">{aiResponse}</p>}
    </div>
  );
};

export default SignUpModule;