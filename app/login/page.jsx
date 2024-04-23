"use client";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  async function setTokenCookie(token) {
    try {
      const response = await fetch("/api/setCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        console.log("Cookie set successfully");
      } else {
        console.error("Failed to set cookie");
      }
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredential = await signInWithEmailAndPassword(email, password);
    console.log(userCredential.user);
    localStorage.setItem("token", JSON.stringify(userCredential.user.uid));
    setTokenCookie(userCredential.user.uid);
  };
  const router = useRouter();

  if (user) {
    // Redirect to a protected page or show logged-in state
    router.push("/chat");
  }

  return (
    <div className="flex min-h-screen bg-custom-pink">
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                className=" dark:bg-white"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" dark:bg-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full outline mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
          <div className="mt-8 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
