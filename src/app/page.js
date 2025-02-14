import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <h2 className="text-4xl text-white font-bold mb-4">
          Manage Your Tasks Efficiently
        </h2>
        <p className="text-lg text-white mb-8">
          Stay organized and boost productivity with our powerful todo app.
        </p>
        <Link
          className="bg-white text-sm text-blue-700 font-semibold py-3 px-8 rounded hover:bg-gray-100 transition duration-300"
          href={"/todos"}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
