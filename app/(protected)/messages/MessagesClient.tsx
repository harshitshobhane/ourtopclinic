'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Doctor {
  id: string;
  name: string;
  imageUrl?: string;
  specialization?: string;
}

interface MessagesClientProps {
  doctors: Doctor[];
}

export default function MessagesClient({ doctors }: MessagesClientProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [message, setMessage] = useState('');

  // Mock messages for demonstration
  const mockMessages = [
    { id: 1, sender: 'doctor', text: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
    { id: 2, sender: 'patient', text: 'I have a question about my prescription.', timestamp: '10:01 AM' },
    { id: 3, sender: 'doctor', text: 'Of course, what would you like to know?', timestamp: '10:02 AM' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: Implement actual message sending
    setMessage('');
  };

  return (
    <div className="flex w-full h-screen">
      {/* Doctors List Sidebar */}
      <div className="w-1/4 border-r border-gray-200 bg-gray-50 p-4">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="space-y-2">
          {doctors.map((doctor) => (
            <button
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`w-full p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors ${
                selectedDoctor?.id === doctor.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {doctor.imageUrl ? (
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {doctor.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{doctor.name}</p>
                {doctor.specialization && (
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedDoctor ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {selectedDoctor.imageUrl ? (
                  <Image
                    src={selectedDoctor.imageUrl}
                    alt={selectedDoctor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {selectedDoctor.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedDoctor.name}</h3>
                {selectedDoctor.specialization && (
                  <p className="text-sm text-gray-500">{selectedDoctor.specialization}</p>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'patient'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a doctor to start chatting
          </div>
        )}
      </div>
    </div>
  );
} 