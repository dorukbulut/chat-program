"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components";
import { useAuth, useAxios } from "@/hooks";
const Login = () => {
  const router = useRouter();
  const { auth, storeAuth } = useAuth();
  const { api } = useAxios();

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      {/* Title */}
      <section className="">
        <div className="text-center">
          <p className="text-5xl tracking-wide font-extrabold animate-pulse">
            Chat App
          </p>
        </div>
      </section>
      <Link
        className="fixed top-20 left-20 p-inline text-indigo-700 hover:underline"
        href="/"
      >
        Home
      </Link>
      <LoginForm />
    </main>
  );
};

export default Login;
