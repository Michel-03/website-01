"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadMessages() {
    setLoading(true);

    const res = await fetch("/api/contact-messages");
    const data = await res.json();

    if (data.success) {
      setMessages(data.messages);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Contact Messages</h1>

      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages available.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white shadow-md px-6 py-4 rounded-xl border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">{msg.name}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-gray-600">{msg.email}</p>

              <div className="mt-3 bg-gray-100 p-3 rounded-lg text-gray-800">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
