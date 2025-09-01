import { useEffect, useRef } from 'react'
import WelcomeMessage from './WelcomeMessage'
import ChatMessage from './ChatMessage'

function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null); 
    useEffect(() => {
        const containerElem = chatMessagesRef.current
        containerElem.scrollTop = containerElem.scrollHeight;
    }, [dependencies]);
    return chatMessagesRef;
}

export function ChatMessages({chatMessages}) {
    const chatMessagesRef = useAutoScroll(chatMessages);

    function renderWelcomeMsg() {
        return (
            <WelcomeMessage />
        );
    }

    function renderContent() {
        return (
            chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage 
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        time={chatMessage.time}
                        key={chatMessage.id}
                    />
                );
            })
        );
    }
    return (
        <div 
            className="flex-1 mt-6 no-scrollbar"
            ref = {chatMessagesRef} 
        >
            {chatMessages.length === 0 ? renderWelcomeMsg() : renderContent()}
        </div>
    );
}