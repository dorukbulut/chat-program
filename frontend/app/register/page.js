"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAxios } from "@/hooks";

import { redirect } from "next/navigation";
import { RegisterForm } from "@/components";
const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      <RegisterForm />
    </main>
  );
};

export default Register;
