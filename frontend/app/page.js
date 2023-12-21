"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { auth } = useAuth();
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      {/*Title*/}
      <section>
        <div className="text-center">
          <p className="text-5xl tracking-wide font-extrabold animate-pulse">
            Chat App
          </p>
        </div>
      </section>

      <section>
        <div className="text-center">
          <Link href={"/login"}>
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-5 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-900">
              Login
            </button>
          </Link>
          <div>
            <p className=" mt-4 text-gray-600">Don't have an account?</p>
            <Link
              className="inline text-indigo-700 justify-self-center  hover:underline"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
