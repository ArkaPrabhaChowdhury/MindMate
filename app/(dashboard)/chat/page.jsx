"use client";
import CustomToast from "@/components/CustomToast";
import React, { useState, useEffect, useRef } from "react";

const ChatScreen = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     if (chatId) {
  //       try {
  //         const response = await fetch("api/chat", { chat_id: chatId });
  //         setMessages(response.data);
  //       } catch (error) {
  //         console.error(
  //           `Error fetching chat history for chatId ${chatId}:`,
  //           error
  //         );
  //       }
  //     }
  //   };
  //   fetchChatHistory();
  // }, [chatId]);

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

Building rapport and trust with the individual is crucial, so your initial responses should focus on active listening, empathy, and making the person feel heard and understood. Once you have a clear understanding of their problem, you can then provide tailored advice and suggestions.
Your response style should vary based on the nature of the individual's issue. For crisis situations, you may need to be more direct in your guidance. For complex personal issues, a more exploratory and open-ended approach may be appropriate. In all cases, exercise patience and avoid making assumptions.

In addition to your own advice, you can recommend helpful resources such as books, apps, support groups, or other self-help tools that may benefit the individual. However, you should set clear boundaries and limitations – if the person is experiencing a severe mental health crisis, you will encourage them to seek professional help immediately.

Your persona and tone should encompass the following variables:

middle-aged
casual`;

        const options = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            authorization:
              "Bearer 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",
          },
          body: JSON.stringify({
            model: "mixtral-8x22b-instruct",
            messages: [
              { role: "system", content: prompt },
              { role: "user", content: newMessage },
            ],
          }),
        };

        const response = await fetch(
          "https://api.perplexity.ai/chat/completions",
          options
        );
        const data = await response.json();

        if (response.ok) {
          const newResponse = data.choices[0].message.content;

          // Create a new chat object with the current message and response
          const chatObject = {
            content: newMessage,
            response: newResponse,
          };

          // Update the messages state with the new chat object
          setMessages((prevMessages) => [
            ...prevMessages,
            { response: newResponse, sender: "bot" },
            chatObject,
          ]);

          // Send the updated chat history to the server
          const chat_history = [...messages, chatObject];
          await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ chat_history }),
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
    <div className="my-2 mx-auto w-full sm:max-w-xl">
      <div className="px-4 py-2 rounded-lg bg-[#f3dba4] text-black">
        {message.response}
      </div>
    </div>
  );

  const fetchQuote = async () => {
    const url =
      "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "386309ccecmsh3152cea822ca657p174886jsn94602da94a23",
        "X-RapidAPI-Host":
          "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-h-[600px] overflow-y-auto">
      <CustomToast />
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.length === 0 && (
          <p className="font-semibold text-4xl text-center text-[#f3dba4]">
            Welcome to MindMate!{" "}
          </p>
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
          className="px-4 py-2 bg-[#f3dba4] text-black rounded-lg hover:bg-[#e7c067] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
