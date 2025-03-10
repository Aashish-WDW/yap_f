"use client";
// pages/index.js - Text-only chat with CSS modules

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './Page.module.css';

// Socket.io connection
let socket;
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:5000';
export default function Home() {
  // States
  const [connected, setConnected] = useState(false);
  const [inQueue, setInQueue] = useState(false);
  const [inChat, setInChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [peerId, setPeerId] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
      resetChat();
    });

    // Socket event handlers
    socket.on('matched', handleMatched);
    socket.on('message', handleReceiveMessage);
    socket.on('peerDisconnected', handlePeerDisconnected);

    // Cleanup on component unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Start chat
  const startChat = async () => {
    setInQueue(true);
    setMessages([]);
    socket.emit('queue', { type: 'text' });
  };

  // Handle when matched with a peer
  const handleMatched = ({ room, peer: remotePeerId }) => {
    console.log(`Matched with peer in room: ${room}`);
    setInQueue(false);
    setInChat(true);
    setRoomId(room);
    setPeerId(remotePeerId);
  };

  // Handle incoming chat messages
  const handleReceiveMessage = (msg) => {
    setMessages(prevMessages => [...prevMessages, { ...msg, isOwn: false }]);
  };

  // Send a chat message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !roomId) return;

    const message = {
      text: inputMessage,
      timestamp: Date.now()
    };

    socket.emit('message', { room: roomId, message: message.text });
    setMessages(prevMessages => [...prevMessages, { ...message, isOwn: true }]);
    setInputMessage('');
  };

  // Find a new chat partner
  const findNew = () => {
    resetChat();
    startChat();
  };

  // Handle when peer disconnects
  const handlePeerDisconnected = () => {
    alert('Your chat partner has disconnected.');
    resetChat();
  };

  // Reset chat state
  const resetChat = () => {
    setInChat(false);
    setInQueue(false);
    setMessages([]);
    setRoomId(null);
    setPeerId(null);
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        {!inChat && !inQueue && (
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardContentDots}></div>
              <div className={styles.cardContentDots}></div>
              <div className={styles.cardContentDots}></div>
            </div>
            <div className={styles.cardTitle}>
              Anonymous Text Chat
            </div>
            <div className={styles.optionsContainer}>
              <button
                onClick={startChat}
                disabled={!connected}
                className={styles.startButton}
              >
                Start Chatting
              </button>
              <div className={styles.cardQuote}>
                Explore, connect, and converse – all anonymously
              </div>
            </div>
          </div>
        )}

        {inQueue && (
          <div className={styles.cardWaiting}>
            <div className={styles.cardContent}>
              <div className={styles.cardContentDots}></div>
              <div className={styles.cardContentDots}></div>
              <div className={styles.cardContentDots}></div>
            </div>
            <div className={styles.cardTitle}>
              Waiting for a match...
            </div>
            <div className={styles.cardQuote}>
              Finding someone interesting for you to chat with
            </div>
            <button
              onClick={resetChat}
              className={styles.startButton}
            >
              Cancel
            </button>
          </div>
        )}

        {inChat && (
          <div className={styles.cardLarge}>
            <div className={styles.cardContent}>
              <div className={styles.cardContentDots}></div>
              <div className={styles.cardContentDots}></div>
              <div className={styles.cardContentDots}></div>
            </div>

            <div className={styles.chatContainer}>
              <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={msg.isOwn ? styles.messageRowRight : styles.messageRowLeft}
                  >
                    <div className={msg.isOwn ? styles.ownMessage : styles.strangerMessage}>
                      <span className="font-bold">{msg.isOwn ? 'You' : 'Stranger'}: </span>
                      <span>{msg.text || msg.message}</span>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className={styles.emptyMessages}>
                    Start chatting with your new match!
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className={styles.messageInput}
                />
                <button
                  type="submit"
                  className={styles.sendButton}
                >
                  Send
                </button>
              </form>

              <button
                onClick={findNew}
                className={styles.newMatchButton}
              >
                Find New Match
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
