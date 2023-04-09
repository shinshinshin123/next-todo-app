import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

export default function Show() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<DocumentData | null>(null);
  const [comment, setComment] = useState({
    name: "",
    content: "",
  });

  // コメント投稿機能
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    const commentData = {
      name: comment.name,
      content: comment.content,
      createdAt: new Date(),
      todoId: id,
    };
    try {
      await addDoc(collection(db, "comments"), commentData);
      setComment({
        name: "",
        content: "",
      })
    } catch(error) {
      console.error(error)
    }
  };

  //個別のtodo(id)をfirestoreのdbから持ってくる
  useEffect(() => {
    const fetchTodo = async () => {
      if(id) {
        const todoRef = doc(db, "todos", id.toString());
        const docSnapshot = await getDoc(todoRef);
        if (docSnapshot.exists()) {
          setTodo(docSnapshot.data());
        }
      }
    };
    fetchTodo();
  }, [id])

  if (!todo) {
    return <div>Loading...</div>
  }

  // Todoの削除処理
  const deleteTodo = async () => {
    if (id) {
      const todoRef = doc(db, "todos", id.toString());
      await deleteDoc(todoRef);
      router.push("/todos");
    }
  };

  return (
    <div>
      <Link href="/todos/edit/${todo.id}">編集する</Link>
      <button onClick={deleteTodo}>削除する</button>
      <Link href="/todos">戻る</Link>
      <h1>タイトル</h1>
      <p>{todo.title}</p>
      <h2>内容</h2>
      <p>{todo.content}</p>
      <h2>ステータス</h2>
      <p>{todo.status}</p>
      <h2>作成日時</h2>
      <p>{todo.createdAt.toDate().toLocaleString()}</p>
      <h2>コメント</h2>
      <div>
        <ul>
          {todo.comments && todo.comments.map((comment :any) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>{comment.name}</p>
              <p>{comment.createdAt.toDate().toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleCommentSubmit}>
      <div>
          <label htmlFor="name">名前</label>
          <input
            value={comment.name}
            onChange={(e) => setComment({ ...comment, name: e.target.value})}
            placeholder="名前"
          />
        </div>
        <div>
          <label htmlFor="content">コメント</label>
          <textarea
            value={comment.content}
            onChange={(e) => setComment({ ...comment, content: e.target.value})}
          />
        </div>
        <button type="submit">コメントを投稿する</button>
      </form>
    </div>
  )
}
