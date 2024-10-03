import React, { useState } from 'react';

const GettingStartedModule = () => {
  const [step, setStep] = useState(0);
  const [aiResponse, setAiResponse] = useState(`Welcome to the Getting Started guide! I'll walk you through the basics of using our platform.`);

  const steps = [
    "Let's start by setting up your profile.",
    "Great! Now, let's explore the dashboard features.",
    "Excellent progress! Let's look at how to schedule your first session.",
    "You're doing great! Now, let's review billing and insurance options.",
    "Congratulations! You've completed the getting started guide."
  ];

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAiResponse(steps[step + 1]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
      <div className="bg-blue-100 p-4 rounded mb-4">
        <p className="text-blue-800">{aiResponse}</p>
      </div>
      <button onClick={handleNextStep} className="bg-blue-500 text-white p-2 rounded" disabled={step === steps.length - 1}>
        {step === steps.length - 1 ? "Completed" : "Next Step"}
      </button>
    </div>
  );
};

export default GettingStartedModule;