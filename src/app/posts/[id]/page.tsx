"use client";

import { useEffect, useState, use } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error("Error al cargar el post");
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar el post.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) return <p>Cargando post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No se encontró el post.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>Autor:</strong> {post.userId}</p>
      <p>{post.body}</p>
    </div>
  );
}
