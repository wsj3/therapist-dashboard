"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const CustomerCRM = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulating initial data fetch
    setClients([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', nextAppointment: '2023-10-01' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', nextAppointment: '2023-10-05' },
    ]);
  }, []);

  const handleCreateClient = () => {
    const newClient = { id: Date.now(), name: '', email: '', phone: '', nextAppointment: '' };
    setClients([...clients, newClient]);
    setEditingClient(newClient);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
  };

  const handleSaveClient = (updatedClient) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
    setEditingClient(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(c => c.id !== clientId));
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input 
          className="flex-grow p-2 border rounded mr-2" 
          placeholder="Search clients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleCreateClient} className="bg-green-500 text-white px-3 py-2 rounded flex items-center">
          <Plus size={16} className="mr-1" /> New Client
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map(client => (
          <div key={client.id} className="bg-white p-4 rounded shadow">
            {editingClient && editingClient.id === client.id ? (
              <div className="space-y-2">
                <input
                  className="w-full p-1 border rounded"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                  placeholder="Name"
                />
                <input
                  className="w-full p-1 border rounded"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  placeholder="Email"
                />
                <input
                  className="w-full p-1 border rounded"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                  placeholder="Phone"
                />
                <input
                  className="w-full p-1 border rounded"
                  value={editingClient.nextAppointment}
                  onChange={(e) => setEditingClient({...editingClient, nextAppointment: e.target.value})}
                  placeholder="Next Appointment"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={() => handleSaveClient(editingClient)} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Save</button>
                  <button onClick={handleCancelEdit} className="bg-gray-300 text-gray-800 px-2 py-1 rounded text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold mb-2">{client.name}</h3>
                <p>Email: {client.email}</p>
                <p>Phone: {client.phone}</p>
                <p>Next Appointment: {client.nextAppointment}</p>
                <div className="mt-2 space-x-2">
                  <button onClick={() => handleEditClient(client)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    <Edit size={14} className="inline mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDeleteClient(client.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    <Trash2 size={14} className="inline mr-1" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCRM;