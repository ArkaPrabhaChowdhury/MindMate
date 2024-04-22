'use client'
import CustomToast from "@/components/CustomToast";
import React, { useState, useEffect, useRef } from "react";

const ChatScreen = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const fetchChatHistory = async () => {
      if (chatId) {
        try {
          const response = await fetch(
            "api/chat",
            { chat_id: chatId }
          );
          setMessages(response.data);
        } catch (error) {
          console.error(
            `Error fetching chat history for chatId ${chatId}:`,
            error
          );
        }
      }
    };
    fetchChatHistory();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: newMessage, sender: "user" },
      ]);
      setNewMessage("");
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/openai/chat", {
          query: newMessage,
          chatId: chatId,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { response: response.data.response, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error:", error);
        showErrorToast("An error occured! please retry")
        
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Create a separate component for rendering user messages
  const UserMessage = ({ message }) => (
    <div className="my-2 max-w-md mx-auto">
      <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
        {message.content}
      </div>
    </div>
  );

  // Create a separate component for rendering bot responses
  const BotResponse = ({ message }) => (
    <div className="my-2 max-w-md mx-auto">
      <div className="px-4 py-2 rounded-lg bg-blue-500 text-white">
        {message.response}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen ">
      <CustomToast />
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.length === 0 && (
          <p>This chat is new. Start a conversation!</p>
        )}
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <UserMessage message={message} />
            <BotResponse message={message} />
          </React.Fragment>
        ))}
        {isLoading && (
          <div className="self-center text-gray-500">
            <span className="animate-spin">&#9696;</span> AI is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
