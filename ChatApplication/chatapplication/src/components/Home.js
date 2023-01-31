import React, { useState } from 'react';
import styled from 'styled-components';
import {io} from 'socket.io-client'; 
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ChatHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #008080;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const ChatBody = styled.div`
  width: 80%;
  height: 80%;
  background-color: #f2f2f2;
  overflow-y: scroll;
`;

const ChatInput = styled.input`
  width: 70%;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  font-size: 18px;
`;

const ChatButton = styled.button`
  width: 20%;
  height: 40px;
  background-color: #008080;
  color: white;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #004d4d;
  }
`;

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io("http://localhost:3002");
  socket.on('connection',(socket) => {
    setMessages("Im on...",socket.id);
  })
  const handleSend = () => {
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <ChatContainer>
      <ChatHeader>Chat App</ChatHeader>
      <ChatBody>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </ChatBody>
      <ChatInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ChatButton onClick={handleSend}>Send</ChatButton>
    </ChatContainer>
  );
}

export default ChatApp;
