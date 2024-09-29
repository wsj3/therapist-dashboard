"use client";

import React, { useState } from 'react';
import { Send, Inbox, Trash2 } from 'lucide-react';

const Email = () => {
  const [emails, setEmails] = useState([
    { id: 1, from: 'john@example.com', subject: 'Appointment Confirmation', content: 'Your appointment is confirmed for tomorrow at 2 PM.', read: false },
    { id: 2, from: 'jane@example.com', subject: 'Insurance Query', content: 'I have a question about my insurance coverage.', read: true },
  ]);
  const [newEmail, setNewEmail] = useState({ to: '', subject: '', content: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    // In a real application, you'd send the email here
    console.log('Sending email:', newEmail);
    setNewEmail({ to: '', subject: '', content: '' });
  };

  const deleteEmail = (id) => {
    setEmails(emails.filter(email => email.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Email</h3>
      <form onSubmit={sendEmail} className="space-y-2">
        <input
          type="email"
          placeholder="To"
          value={newEmail.to}
          onChange={(e) => setNewEmail({...newEmail, to: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newEmail.subject}
          onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={newEmail.content}
          onChange={(e) => setNewEmail({...newEmail, content: e.target.value})}
          className="w-full p-2 border rounded"
          rows="4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center">
          <Send size={18} className="mr-2" /> Send Email
        </button>
      </form>
      <div className="space-y-2">
        <h4 className="font-semibold"><Inbox className="inline mr-2" size={18} /> Inbox</h4>
        {emails.map(email => (
          <div key={email.id} className={`bg-white p-4 rounded shadow ${email.read ? 'opacity-75' : ''}`}>
            <div className="flex justify-between">
              <p className="font-semibold">{email.from}</p>
              <button onClick={() => deleteEmail(email.id)} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
            <p className="font-medium">{email.subject}</p>
            <p className="text-sm">{email.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Email;