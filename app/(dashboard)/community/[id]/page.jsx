"use client";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [thread, setThread] = useState({});

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

  return (
    <div className="bg-custom-pink">
      <Card className="bg-custom-pink w-full h-screen max-h-full">
        <div>
          <h1 className="text-4xl font-bold">{thread.title}</h1>
          <p>{thread.content}</p>
        </div>

        <div>
          {thread.comments &&
            thread.comments.map((comment) => (
              <div key={comment.id}>
                <h1>{comment.author}</h1>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Page;
