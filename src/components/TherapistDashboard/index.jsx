"use client";

import React, { useEffect } from 'react';

const TherapistDashboard = () => {
  useEffect(() => {
    console.log('TherapistDashboard mounted');
  }, []);

  console.log('Rendering TherapistDashboard');
  return <div>Therapist Dashboard Content</div>;
};

export default TherapistDashboard;