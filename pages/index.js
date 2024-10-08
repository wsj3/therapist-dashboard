"use client";

import React, { useEffect } from 'react';
import TherapistDashboard from '../src/components/TherapistDashboard/TherapistDashboard';

const Home = () => {
  useEffect(() => {
    console.log('Home page mounted');
  }, []);

  console.log('Rendering Home page');
  return (
    <main>
      <TherapistDashboard />
    </main>
  );
};

export default Home;