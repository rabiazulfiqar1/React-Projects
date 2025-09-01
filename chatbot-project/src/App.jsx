import { useEffect, useState} from 'react'
import ChatInput from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'
import './App.css'
import { Chatbot } from 'supersimpledev';

function App() {
  useEffect(() => {
    Chatbot.addResponses({"I am feeling sad": "Its okay! I can understand. How can I make you feel better?"}, []);
  });

  const storedMsgs = localStorage.getItem("messages") //returns null if empty
  const array = useState(storedMsgs ? JSON.parse(storedMsgs) : []);
  
  const [chatMessages, setChatMessages] = array; 
  
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
      <div className="max-w-2xl mx-auto px-4 h-screen flex flex-col">
          <ChatMessages 
              chatMessages={chatMessages}
          />
          <ChatInput 
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
          />
      </div>
  );
}

export default App
