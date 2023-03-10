import React, { useState , useEffect } from 'react';
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
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

var email = makeid(5)
var m = 0
const socket = io("http://localhost:3002",{query:`loggeduser=${email}`});
function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // const [email,setEmail] = useState('abc@gmail.com')
  // const [id,setid] = useState(0);
  useEffect(() => {
      if(m > 0) return ;
      socket.on('connect',() => {
        console.log("Connected" + socket.id);
        // m.push(socket.id);
        // socket.emit(email);
        setMessages([...messages,"Im on... " + socket.id]);
      })
      socket.on('new_inserted',(data) =>{
        // alert(socket.id)
        // m.push(data)
        setMessages(message => [...message,data])
      })
      socket.on("checkme",(data) => {
        console.log('data ==> ',data)
      })
      m += 1
  },[])
  const handleSend = () => {
    setMessages(message => [...message,input]);
    // m.push(input)
    socket.emit('check',input)
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
