"use client";

import Link from 'next/link';
import { useState } from 'react';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      {/* Title */}
      <section className=''>
        <div className="text-center">
            <p className="text-5xl tracking-wide font-extrabold animate-pulse">Chat App</p>
        </div>
      </section>

      <Link className="fixed top-20 left-20 p-inline text-indigo-700 hover:underline" href="/">
            Home
        </Link>

      {/* Login Form */}
      <section className='flex flex-col gap-10'>
         
        <form className="w-full max-w-sm">
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">
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
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-900">
              <Link href="#">Login</Link>
            </button>
          </div>
        </form>

        <p className=" mt-4 text-gray-600">
          Don't have an account?
          <Link className="inline text-indigo-700 hover:underline" href="/register">
            Register
          </Link> 
        </p>
    
      </section>
    </main>
  );
};

export default Login;