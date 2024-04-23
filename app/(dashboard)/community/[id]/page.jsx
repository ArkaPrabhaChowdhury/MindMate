"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [thread, setThread] = useState({});

  const [content, setContent] = useState("");

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      const res = await fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setThread(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching thread:", error);
    }
  };

  const comments = thread.comments || [];

  const postComment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, content, parentId: thread._id }),
      });

      const data = await response.json();
      setContent("");

      const newComment = await fetch("/api/post", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId: data.postId, postId: thread._id }),
      });

      console.log("Comment added successfully:", newComment);
      fetchThread();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  
  const fetchComment = async (id) => {
    try {
      const res = await fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await res.json();
    } catch (error) {
      console.error("Error fetching thread:", error);
    }
  };
  
  
  const commentData = comments.map((comment) => {
    fetchComment(comment);
  })
  console.log(commentData);

  return (
    <div>
      <div>
        <div
          key={thread._id}
          className="bg-custom-pink shadow-md rounded-lg p-5 mb-6"
        >
          <h2 className="text-xl font-semibold mb-3">{thread.content}</h2>
          {/* <div className="flex items-center text-gray-600">
            <span>{thread.comments.length} comments</span>
          </div> */}
        </div>
      </div>

      <div className="flex gap-5">
        <Input
          type="text"
          placeholder="Reply..."
          className="rounded-3xl px-6 py-6 border-none dark:bg-slate-300"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={postComment}
          className="rounded-3xl px-6 py-6 no-focus dark:bg-custom-pink text-black"
        >
          Reply
        </Button>
      </div>

      <div className="mt-10">
        {comments.length === 0 ? (
          <div className="w-full flex justify-center">
            <p>No Comments</p>
          </div>
        ) : (
          commentData.map((comment) => (
            <div>
              <div
                key={comment._id}
                className="bg-custom-pink shadow-md rounded-lg p-5 mb-6"
              >
                <h2 className="text-xl font-semibold mb-3">
                  {comment.content}
                </h2>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
