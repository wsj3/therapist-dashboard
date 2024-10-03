"use client";

import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, ChevronDown } from 'lucide-react';

const InsuranceBilling = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ patient: '', service: '', amount: '', date: '', insurer: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addBill = (e) => {
    e.preventDefault();
    setBills([...bills, { ...newBill, id: Date.now() }]);
    setNewBill({ patient: '', service: '', amount: '', date: '', insurer: '' });
  };

  const deleteBill = (id) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  const handleDropdownSelect = (option) => {
    // Here you would typically handle the selection
    console.log(`Selected: ${option}`);
    setDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Insurance Billing</h3>
      
      {/* Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between"
        >
          <span>Actions</span>
          <ChevronDown size={20} />
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
            <ul>
              <li 
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownSelect('Select Insurer')}
              >
                Select Insurer
              </li>
              <li 
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDropdownSelect('Client Lookup')}
              >
                Client Lookup
              </li>
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={addBill} className="space-y-2">
        <input
          type="text"
          placeholder="Patient Name"
          value={newBill.patient}
          onChange={(e) => setNewBill({...newBill, patient: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Service"
          value={newBill.service}
          onChange={(e) => setNewBill({...newBill, service: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBill.amount}
          onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={newBill.date}
          onChange={(e) => setNewBill({...newBill, date: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Insurer"
          value={newBill.insurer}
          onChange={(e) => setNewBill({...newBill, insurer: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center">
          <Plus size={18} className="mr-2" /> Add Bill
        </button>
      </form>
      <div className="space-y-2">
        {bills.map(bill => (
          <div key={bill.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{bill.patient}</p>
              <p>{bill.service}</p>
              <p><DollarSign className="inline" size={14} /> {bill.amount}</p>
              <p>{bill.date}</p>
              <p>{bill.insurer}</p>
            </div>
            <button onClick={() => deleteBill(bill.id)} className="text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceBilling;