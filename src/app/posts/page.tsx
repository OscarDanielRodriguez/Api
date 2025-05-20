"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando posts...</p>;
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-600 mt-1 mb-2">
              <strong>Autor:</strong> {post.userId}
            </p>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
