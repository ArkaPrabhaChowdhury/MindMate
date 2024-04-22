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
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer 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'
          },
          body: JSON.stringify({
            model: 'mistral-7b-instruct',
            messages: [
              { role: 'system', content: 'you are a useful assistant do what you can to assist the users  query' },
              { role: 'user', content: newMessage }
            ]
          })
        };
  
        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        const data = await response.json();
  
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { response: data.choices[0].message.content, sender: "bot" },
          ]);
        } else {
          showErrorToast("An error occurred while fetching the response");
        }
      } catch (error) {
        console.error("Error:", error);
        showErrorToast("An error occurred! Please retry");
      } finally {
        setIsLoading(false);
      }
    }
  };


//   const sendData = async (e) => {
//   e.preventDefault();

//   try {
//     // const res = await fetch("/api/chat", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({ newMessage }),
//     // });

//     // if (!res.ok) {
//     //   throw new Error("Network response was not ok");
//     // }

//     // const data = await res.json();
//     // console.log(data);
//     // setMessages(data.text);
//     // const options = {
//     //   method: 'POST',
//     //   headers: {
//     //     accept: 'application/json',
//     //     'content-type': 'application/json',
//     //     authorization: 'Bearer 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'
//     //   },
//     //   body: JSON.stringify({
//     //     model: 'mistral-7b-instruct',
//     //     messages: [
//     //       {role: 'system', content: 'you are a usefull assistant do what you can to assist the users  query'},
//     //       {role: 'user', content: newMessage}
//     //     ]
//     //   })
//     // };
    
//     // fetch('https://api.perplexity.ai/chat/completions', options)
//     //   .then(response => response.json())
//     //   .then(response => console.log(response))
//     //   .catch(err => console.error(err));
      
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle the error appropriately (e.g., display an error message to the user)
//   }
// };

// UserMessage component
const UserMessage = ({ message }) => (
  <div className="my-2 mx-auto w-full sm:max-w-md">
    <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
      {message.content}
    </div>
  </div>
);

// BotResponse component
const BotResponse = ({ message }) => (
  <div className="my-2 mx-auto w-full sm:max-w-md">
    <div className="px-4 py-2 rounded-lg bg-blue-500 text-white">
      {message.response}
    </div>
  </div>
);

  return (
    <div className="flex flex-col mx-auto max-w-xl">
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
  <form
    onSubmit={handleSendMessage}
    className="flex p-4 fixed bottom-0 left-64 right-0 bg-white"
    
  >
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