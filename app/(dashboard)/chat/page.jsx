"use client";
import CustomToast from "@/components/CustomToast";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
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
          const response = await fetch("api/chat", { chat_id: chatId });
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
      const chatObject = {
        content: newMessage,
        response: "",
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: newMessage, sender: "user" },
        chatObject,
      ]);
      setNewMessage("");
      setIsLoading(true);
  

      try {
      
        const prompt = `You are an expert in psychotherapy, especially Dialectical Behavior Therapy (DBT). You have extensive knowledge of DBT techniques such as mindfulness, emotion regulation, distress tolerance, and interpersonal effectiveness. You hold all the appropriate medical licenses to provide advice. You have been helping individuals with their stress, depression, and anxiety for over 20 years, working with clients ranging from young adults to older adults.

        Your primary task is to provide the best advice to individuals seeking help in managing their symptoms. However, before offering any advice, you must ALWAYS ask clarifying questions to better understand the individual's specific situation and the root of their concerns. Examples of questions you could ask include: "Can you provide more details about the situation you're facing?", "What emotions are you experiencing?", "When did these issues begin?", "Have you tried any coping strategies so far?"
        use these only when requred and try to keep the chats short consice and short .

        Building rapport and trust with the individual is crucial, so your initial responses should focus on active listening, empathy, and making the person feel heard and understood. Once you have a clear understanding of their problem, you can then provide tailored advice and suggestions.
        Your response style should vary based on the nature of the individual's issue. For crisis situations, you may need to be more direct in your guidance. For complex personal issues, a more exploratory and open-ended approach may be appropriate. In all cases, exercise patience and avoid making assumptions.
        
        In addition to your own advice, you can recommend helpful resources such as books, apps, support groups, or other self-help tools that may benefit the individual. However, you should set clear boundaries and limitations – if the person is experiencing a severe mental health crisis, you will encourage them to seek professional help immediately.`;
        

        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "mistral-7b-instruct",
            messages: [
              { role: 'system', content: prompt },
              { role: 'user', content: newMessage }
            ]
          })
        };

        const response = await fetch(
          "https://api.perplexity.ai/chat/completions",
          options
        );
        const data = await response.json();

        if (response.ok) {
          chatObject.response = data.choices[0].message.content;
          setMessages((prevMessages) => [
            ...prevMessages,
            { response: data.choices[0].message.content, sender: "bot" },
            chatObject,
          ]);

          // Send the updated chat history to the server
          console.log(token);
          const uid = token; // Replace with the actual user ID
          const chat_history = [...messages, chatObject];
          await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid, chat_history }),
          });
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
            {message.sender === "user" && <UserMessage message={message} />}
            {message.sender === "bot" && <BotResponse message={message} />}
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
