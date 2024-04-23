"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaCommentAlt, FaPencilAlt } from "react-icons/fa";

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
      const response = await fetch("/api/community");
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
      console.log("User data fetched:", data.name);
      setName(data.name);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const addPost = async () => {
    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, uid }),
      });

      const data = await response.json();
      setShowModal(false);
      setContent("");
      fetchThreads();
      console.log(data);
    } catch (error) {
      console.error("Error adding post:", error);
    }
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
              <div
                key={thread._id}
                className="bg-custom-pink shadow-md rounded-lg p-5 mb-6"
                onClick={() => toggleComments(thread._id)}
              >
                <h3 className="text-sm font-semibold mb-3">{name}</h3>
                <h2 className="text-xl font-semibold mb-3">{thread.content}</h2>
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
                    onClick={addPost}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ThreadsPage;
