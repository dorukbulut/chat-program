import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAxios } from "@/hooks";
import { useRouter } from "next/navigation";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [suberrors, setSubErrors] = useState([]);
  const { api } = useAxios();

  useEffect(() => {
    setSubErrors([]);
    if (password === "" || username === "" || name === "" || surname === "") {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors, "Fields cannot be empty!"];
        const uniqueArray = [...new Set(newErrors)];
        return uniqueArray;
      });
    } else {
      setErrors([]);
    }
  }, [username, password, name, surname]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
      name,
      surname,
    };

    try {
      const res = await api.post("/user/register", data);
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };

  return (
    <>
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

      {/* Register Form */}
      <section className="flex flex-col gap-10">
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
              placeholder="Enter your surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

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
              placeholder="Choose a username"
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
              className="disabled:opacity-50 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-900"
            >
              <Link href="/dashboard">Register</Link>
            </button>
          </div>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account?
          <Link
            className="inline text-indigo-700 hover:underline"
            href="/login"
          >
            Login
          </Link>
        </p>
      </section>
    </>
  );
}
