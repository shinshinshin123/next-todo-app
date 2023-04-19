import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  // addDoc,
  // collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { db } from "src/lib/firebase";

//　型定義(後ほど別ファイルに移行する)
// type Comment = {
//   id: string;
//   name: string;
//   content: string;
//   todoId: string;
// }

export default function Show() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<DocumentData & { comments?: Comment[]}| null>(null);
  const [comment, setComment] = useState({
    name: "",
    content: "",
  });

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

  // todoのidを取得するまでにLoding画面を出す。
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
      {/* コメント */}
      <h2>コメント</h2>
    </div>
  )
}
