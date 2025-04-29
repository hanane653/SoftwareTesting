import React, { useEffect, useRef, useState } from 'react'; 
import { Client } from '@stomp/stompjs';

const ChatDirect = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const name = prompt("Entre ton nom d'utilisateur :");
    setUsername(name || 'Anonyme-' + Math.floor(Math.random() * 1000));
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws-chat',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connecté');

        client.subscribe('/topic/group', (msg) => {
          const received = JSON.parse(msg.body);
          setMessages((prev) => [...prev, received]);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
    });

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (stompClient && message.trim() !== '') {
      const newMessage = {
        content: message,
        sender: username,
      };
      stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(newMessage),
      });
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl bg-white shadow-lg font-sans">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Chat en Direct</h2>

      <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
        {messages.map((msg, index) => {
          const isMine = msg.sender === username;
          return (
            <div
              key={index}
              className={`mb-2 flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  isMine
                    ? 'bg-orange-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-[10px] text-gray-300 mt-1 text-right italic">
                  {msg.sender}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Écris ton message..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatDirect;

