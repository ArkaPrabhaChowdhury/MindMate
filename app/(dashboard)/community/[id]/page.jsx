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
      const res = await fetch(`/api/post/${id}`,{
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
    <div>
      <Card className="w-full h-screen max-h-full">
        <p>{thread.content}</p>
      </Card>
    </div>
  );
};

export default Page;
