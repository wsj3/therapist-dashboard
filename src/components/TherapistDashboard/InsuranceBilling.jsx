"use client";

import React, { useState } from 'react';
import { DollarSign, Plus, Trash2 } from 'lucide-react';

const InsuranceBilling = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({ patient: '', service: '', amount: '', date: '' });

  const addBill = (e) => {
    e.preventDefault();
    setBills([...bills, { ...newBill, id: Date.now() }]);
    setNewBill({ patient: '', service: '', amount: '', date: '' });
  };

  const deleteBill = (id) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Insurance Billing</h3>
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