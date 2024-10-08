import React from 'react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Home, Calendar, Users, Mail, DollarSign, FileText, BarChart2, Video, Stethoscope, Settings, Info, Phone, HelpCircle } from 'lucide-react';

const TherapistDashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Therapist's Friend</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </nav>
      </header>

      <main className="flex-grow p-8">
        <SignedIn>
          <AuthenticatedDashboard />
        </SignedIn>
        <SignedOut>
          <LandingPage />
        </SignedOut>
      </main>

      <footer className="bg-gray-800 p-4 text-center">
        <p>"2024 Therapist's Friend. All rights reserved."</p>
      </footer>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to Therapist's Friend</h1>
      <p className="text-xl mb-8">Empower your therapy practice with AI-driven insights and tools.</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <FeatureCard 
          title="Therapist Benefits" 
          features={[
            "AI-powered session analysis",
            "Automated note-taking and transcription",
            "Secure patient management",
            "Integrated billing and scheduling"
          ]}
          icon={<Stethoscope className="w-12 h-12 mb-4" />}
        />
        <FeatureCard 
          title="Patient Benefits" 
          features={[
            "Easy appointment booking",
            "Secure messaging with therapists",
            "Progress tracking and insights",
            "Resources for self-help and growth"
          ]}
          icon={<Users className="w-12 h-12 mb-4" />}
        />
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to transform your practice?</h2>
        <div className="space-x-4">
          <SignUpButton mode="modal">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
              Get Started
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, features, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
      <div className="flex justify-center">{icon}</div>
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      <ul className="list-disc list-inside space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-300">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

const AuthenticatedDashboard = () => {
  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'Calendar', icon: Calendar },
    { name: 'Patients', icon: Users },
    { name: 'Messages', icon: Mail },
    { name: 'Billing', icon: DollarSign },
    { name: 'Notes', icon: FileText },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Video Sessions', icon: Video },
    { name: 'Diagnosis', icon: Stethoscope },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 p-4">
        <nav>
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome back, Dr. Smith</h2>
        <p>Your dashboard content goes here...</p>
      </div>
    </div>
  );
};

const TherapistDashboard = () => {
  return <TherapistDashboardLayout />;
};

export default TherapistDashboard;