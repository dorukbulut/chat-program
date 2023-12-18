"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [suberrors, setSubErrors] = useState([]);
  const { api } = useAxios();
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);
  useEffect(() => {
    setSubErrors([]);
    if (password === "" || username === "") {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors, "Fields cannot be empty!"];
        const uniqueArray = [...new Set(newErrors)];
        return uniqueArray;
      });
    } else {
      setErrors([]);
    }
  }, [username, password]);

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
      {errors.map((error, index) => (
        <div className="text-red-500" key={index}>
          {error}
        </div>
      ))}
      {suberrors.map((error, index) => (
        <div className="text-red-500" key={index + 10}>
          {error}
        </div>
      ))}
      {/* Login Form */}
      <section className="flex flex-col items-center gap-10">
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              onClick={onSubmit}
              disabled={errors.length !== 0}
              className={`disabled:opacity-50 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-900`}
            >
              Login
            </button>
          </div>
        </form>

        <p className=" mt-4 text-gray-600">
          Don't have an account?
          <Link
            className="inline text-indigo-700 hover:underline"
            href="/register"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
