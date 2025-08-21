
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessageStream, startChat } from '../services/geminiService';
import { XIcon } from './icons/XIcon';
import { SendIcon } from './icons/SendIcon';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    setMessages([]); // Clear previous messages
    try {
      startChat(); // Initialize Gemini chat session
      const stream = await sendMessageStream("Hello"); // Initial prompt to get greeting

      let botResponse = '';
      setMessages(prev => [...prev, { id: Date.now(), text: '', sender: 'bot' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.sender === 'bot') {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...lastMessage, text: botResponse };
            return newMessages;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
      setMessages(prev => [...prev, { id: Date.now(), text: 'Sorry, I\'m having trouble connecting. Please try again later.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await sendMessageStream(input);
      let botResponse = '';
      setMessages(prev => [...prev, { id: Date.now() + 1, text: '', sender: 'bot' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.sender === 'bot') {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...lastMessage, text: botResponse };
            return newMessages;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { id: Date.now(), text: 'An error occurred. Please try again.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md z-40 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <h2 className="text-lg font-bold">AI Wellness Coach</h2>
        <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
          <XIcon className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
              msg.sender === 'user' 
              ? 'bg-primary-600 text-white rounded-br-lg' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-lg'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1]?.sender === 'user' && (
           <div className="flex justify-start">
             <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for fitness tips..."
            className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-primary-600 text-white p-3 rounded-full disabled:bg-primary-300 disabled:cursor-not-allowed">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

