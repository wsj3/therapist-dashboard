import { useState } from 'react'

export default function TailwindTest() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Advanced Tailwind CSS Test</h1>
        
        <p className="text-gray-700 mb-4">This page demonstrates various Tailwind CSS features:</p>
        
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
          <li>Gradient background</li>
          <li>Rounded corners and shadows</li>
          <li>Responsive design</li>
          <li>Hover and focus states</li>
          <li>Flexbox and spacing utilities</li>
        </ul>
        
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setCount(count - 1)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition"
          >
            Decrease
          </button>
          <span className="text-2xl font-semibold text-gray-700">{count}</span>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
          >
            Increase
          </button>
        </div>
        
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">This is an example of an alert component using Tailwind CSS.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-200 p-4 rounded">Grid Item 1</div>
          <div className="bg-green-200 p-4 rounded">Grid Item 2</div>
          <div className="bg-red-200 p-4 rounded">Grid Item 3</div>
          <div className="bg-purple-200 p-4 rounded">Grid Item 4</div>
        </div>
      </div>
    </div>
  )
}