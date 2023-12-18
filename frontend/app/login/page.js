"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { LoginForm } from "@/components";
const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const res = await signIn("login", data);
      console.log(res);
    } catch (error) {
      setSubErrors((prevErrors) => {
        const newErrors = [...prevErrors, error.response.data.detail];
        const uniqueArray = [...new Set(newErrors)];
        return uniqueArray;
      });
    }
  };

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
