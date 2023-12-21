import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAxios, useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [suberrors, setSubErrors] = useState([]);
  const { api } = useAxios();
  const { auth, storeAuth } = useAuth();
  useEffect(() => {
    if (auth) {
      router.push("/dashboard");
    }
  }, [auth]);
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
      const res = await api.post("/user/login", data);

      await storeAuth({
        access_token: res.data.access_token,
        username: res.data.username,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      setSubErrors((prevErrors) => {
        const newErrors = [...prevErrors, error.response.data.detail];
        const uniqueArray = [...new Set(newErrors)];
        return uniqueArray;
      });
    }
  };

  return (
    <>
      <div>
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
      </div>

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
    </>
  );
}
