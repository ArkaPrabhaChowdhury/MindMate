"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CheckToken = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined (to avoid issues on the server-side)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        // Redirect to /chat if token exists
        router.push("/chat");
      } else {
        // Redirect to /login if token doesn't exist
        router.push("/login");
      }
    }
  }, [router]);

  return null; // This component doesn't render any UI
};

export default CheckToken;
