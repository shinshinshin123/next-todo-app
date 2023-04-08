import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteDoc, doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";

export default function Show() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<DocumentData | null>(null);

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
      <h3>タイトル</h3>
      <p>{todo.title}</p>
      <h3>内容</h3>
      <p>{todo.content}</p>
      <h3>ステータス</h3>
      <p>{todo.status}</p>
      <h3>作成日時</h3>
      <p>{todo.createdAt.toDate().toLocaleString()}</p>
      <Link href="/todos/edit/${todo.id}">編集する</Link>
      <button onClick={deleteTodo}>削除する</button>
      <Link href="/todos">戻る</Link>
    </div>
  )
}
