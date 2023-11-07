'use client';
import React, { useState, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: string;
  content: string;
};

export default function Chat() {
  console.log("Chat page");

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const sendMessage = async (content: string) => {
    const userMessage = { role: 'user', content };
    let newMessages = [...messages, userMessage];
    
    setMessages(newMessages);

    const response = await fetch('./api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        messages: newMessages,
      }),
    });

    const data = await response.json();
    const message = data.choices[0].message;

    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleEnterPress = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await sendMessage(input);
      setInput('');
    }
  };

  const handleSendClick = async () => {
    await sendMessage(input);
    setInput('');
  };

  return (
    <main>
    <h1>Chat</h1>
    <textarea value={input} onChange={handleInputChange} onKeyDown={handleEnterPress} style={{ width: '85%', height: '300px' }} />
    <button onClick={handleSendClick}>Send</button>
    {messages.map((message, index) => (
      <div key={index}>
        <strong>{message.role}:</strong>
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    ))}
  </main>
  );
}