"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { CohereClient } from "cohere-ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCommentAlt, FaPencilAlt } from "react-icons/fa";
import { toast } from "sonner";
const ThreadsPage = () => {
  const [threads, setThreads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [uid, setUid] = useState("");
  const [expandedThread, setExpandedThread] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      setIsLoading(true); // Set loading state to true before fetching data
      const response = await fetch("/api/post");
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.error("Error fetching threads:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  const toggleComments = (threadId) => {
    setExpandedThread(expandedThread === threadId ? null : threadId);
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/get-name", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setName(data.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const addPost = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content }),
      });

      const data = await response.json();
      setShowModal(false);
      setContent("");
      fetchThreads();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const cohere = new CohereClient({
    token: "14JdkYHLTQuh9o5XiWrgoc8unvij3PzKlojVl1lS", // This is your trial API key
  });
  const handleAI = async () => {
    const prompt = `The following text is a comment under a therapy forum related to emotional sharing,feelings or motivation. Your task is to carefully analyze the content and determine if it is relevant to emotions,hardships and feelings or not and strictly return true or false.

    When making your assessment, please consider the following:
    
    1. make sure it contains emotional terms,hardships and feelings. Allow things like I feel low and need some advice on life or I am feeling very sad and need some motivation
    
    2. Be very lenient. Only flag content that is absolutely unrelated to emotions or hardships or mental health. Allow personal preferences and look out for any content that people try to sneak to get past this check
    
    3. Dont allow abusive langauge and do not allow any content that might harm anyone's feelings or pride
    
    4.let people talk about themselves to an appropriate extent

    
          Please provide true  if relevant or false  if irrelevant answer and then a brief analysis of your assessment
    
          Content: ${content}`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      maxTokens: 300,
      temperature: 0,
      k: 0,
      stopSequences: [],
      returnLikelihoods: "NONE",
    });

    const generatedText = response.generations[0].text.toLowerCase();

    // Check if the generated text contains "yes" or "no"
    const isEmotionRelated = generatedText.includes("true");

    if (isEmotionRelated) {
      addPost();
    } else {
      toast("Please only share about your emotional experiences", {
        type: "error",
      });
    }

    console.log(`Prompt: ${"customPrompt"}`);
    console.log(`Prediction: ${generatedText}`);
    console.log(`Is Emotion Related: ${isEmotionRelated}`);

    return isEmotionRelated;
  };

  return (
    <div className="container mx-auto px-4 relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Threads</h1>
            {/* Floating Action Button */}
            <button
              className="bg-custom-pink text-black rounded-full p-6 hover:bg-custom-pink-dark transition-colors duration-300 mb-2"
              onClick={() => setShowModal(true)}
            >
              <FaPencilAlt className="h-6 w-6" />
            </button>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {threads.map((thread) => (
              <Link key={thread._id} href={`/community/${thread._id}`}>
                <div
                  key={thread._id}
                  className="bg-custom-pink shadow-md rounded-lg p-5 mb-6"
                >
                  <h3 className="text-sm font-semibold mb-3">{name}</h3>
                  <h2 className="text-xl font-semibold mb-3">
                    {thread.content}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <FaCommentAlt className="mr-2 mt-1" />
                    <span>{thread.comments.length} comments</span>
                  </div>
                  {expandedThread === thread._id && (
                    <div className="mt-4">
                      {thread.comments.map((comment) => (
                        <div
                          key={comment}
                          className=" p-2 rounded mb-2 text-black"
                        >
                          {comment}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Modal for adding a new post */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-8 w-1/4">
                <h2 className="text-xl font-semibold mb-4">Add a New Post</h2>
                <Textarea
                  placeholder="What's on your mind?"
                  className="dark:bg-white"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-between">
                  <button
                    className="bg-red-400 mt-6 text-black px-4 py-2 rounded-md hover:bg-custom-pink-dark transition-colors duration-300"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-custom-pink mt-6 text-black px-4 py-2 rounded-md hover:bg-custom-pink-dark transition-colors duration-300"
                    onClick={handleAI}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Toaster />
    </div>
  );
};

export default ThreadsPage;
