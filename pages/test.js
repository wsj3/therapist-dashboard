export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test</h1>
        <p className="text-gray-700 mb-2">If you can see this text styled:</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>With a white background</li>
          <li>Inside a rounded container with a shadow</li>
          <li>With a blue title</li>
          <li>And this list with bullets</li>
        </ul>
        <p className="mt-4 text-green-600 font-semibold">Then Tailwind CSS is working correctly!</p>
      </div>
    </div>
  )
}