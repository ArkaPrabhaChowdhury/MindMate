"use client";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      if (user) {
        // Send user data to the server-side API route
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            uid: user.uid,
          }),
        });
        const data = await res.json();
        console.log(data);
        router.push("/chat");
        localStorage.setItem("token", JSON.stringify(userCredential.user.uid));
        // Redirect to a protected page or show signed-up state
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-custom-pink">
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create an account to get started
            </p>
          </div>
          <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className=" dark:bg-white"
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
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
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
          <div className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
