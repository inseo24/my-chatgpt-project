'use client';
import React, { useState, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function Chat() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const addMessage = (role: Message['role'], content: string) => {
    setMessages((prev) => [...prev, { role, content }]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return; 
    
    setLoading(true); 
    setInput('');
    
    addMessage('user', content);

    try {
      const response = await fetch('./api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content }] }), 
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      addMessage('bot', data.choices[0].message.content);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setLoading(false);
  };

  const handleCommandEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.metaKey) {
      event.preventDefault();
      sendMessage(input).catch(console.error);
    }
  };

  return (
<main className={styles.chatContainer}>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles.inputArea}>
        <textarea
          className={styles.input}
          placeholder="Type your message here..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleCommandEnter}
          disabled={loading}
          rows={8}
          style={{resize: 'none'}} 
        />
        <button
          className={styles.sendButton}
          onClick={() => sendMessage(input).catch(console.error)}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>

      {/* 메시지 출력 */}
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.role]}`}>
            {/* user|bot 문구를 제거, 굵은 글씨체 제거 */}
            <ReactMarkdown className={styles.messageContent}>{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      {loading && <div className={styles.loading}></div>}
    </main>
  );
}
