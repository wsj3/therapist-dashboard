"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ title: '', date: '', time: '' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const addAppointment = (e) => {
    e.preventDefault();
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ title: '', date: '', time: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={prevMonth}><ChevronLeft /></button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {[...Array(firstDayOfMonth).keys()].map(i => (
          <div key={`empty-${i}`} className="h-20"></div>
        ))}
        {[...Array(daysInMonth).keys()].map(day => (
          <div key={day} className="border p-2 h-20">
            <div className="font-bold">{day + 1}</div>
            {appointments
              .filter(apt => new Date(apt.date).getDate() === day + 1)
              .map(apt => (
                <div key={apt.title} className="text-sm bg-blue-100 p-1 mt-1 rounded">
                  {apt.title}
                </div>
              ))}
          </div>
        ))}
      </div>
      <form onSubmit={addAppointment} className="space-y-2">
        <input
          type="text"
          placeholder="Appointment Title"
          value={newAppointment.title}
          onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={newAppointment.date}
          onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          value={newAppointment.time}
          onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Appointment</button>
      </form>
    </div>
  );
};

export default Calendar;