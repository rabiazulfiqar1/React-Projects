import { useState} from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinner from '../assets/loading-spinner.gif'
import dayjs from 'dayjs'

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setLoading] = useState(false);

  function saveInputText(event) {
      const input = event.target 
      setInputText(input.value);
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.setItem("messages", JSON.stringify([]));
  }

  async function sendMessage() {
      if (!inputText.trim() || isLoading) {
          return;
      }
      setInputText("");
      setLoading(true);
      const newChatMessages = [
          ...chatMessages,
          {
              message: inputText,
              sender: "user",
              time: dayjs().valueOf(),
              id: crypto.randomUUID()
          },
          {
              message: <img src={LoadingSpinner} alt="loading...." className="h-10"/>,
              sender: "robot",
              time: dayjs().valueOf(),
              id: crypto.randomUUID()
          }
      ];
      setChatMessages(newChatMessages);

      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
          ...newChatMessages.slice(0,-1),
          {
              message: response,
              sender: "robot",
              time: dayjs().valueOf(),
              id: crypto.randomUUID()
          }
      ]);
      setLoading(false);
  }

  function checkKey(event) {
      if (event.key === "Enter") {
          sendMessage();
      }
      else if (event.key === "Escape") setInputText("");
  }

  return (
      <div className = "flex items-center justify-center gap-3 mb-6">
          <input 
              className = "px-3 py-2.5 flex-1 border border-black rounded-lg" 
              placeholder="Send a message to Chatbot"
              onChange={saveInputText}
              value={inputText} 
              onKeyDown={checkKey}
          />
          <button 
              className="px-5 py-3 bg-green-600 rounded-xl text-white text-base"
              onClick={sendMessage}
          >Send</button>
          <button 
              className="px-5 py-3 bg-gray-300 rounded-xl text-black text-base"
              onClick={clearMessages}
          >Clear</button>
      </div>
  );
}

export default ChatInput