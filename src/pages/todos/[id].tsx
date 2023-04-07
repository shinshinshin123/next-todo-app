import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, collection, doc, getDoc, CollectionReference, DocumentData } from "firebase/firestore";

export default function Show() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState();

  useEffect(() => {
    const fetchTodo = async () => {
      const db = getFirestore();
      //コレクションの参照を取得
      const todosRef = collection(db, "todods");
      //Todoのドキュメントの参照を取得
      const todoDoc = doc(todosRef, id);
      //ドキュメントのデータを取得
      const todoData = await getDoc(todoDoc);
      setTodo(todoData.data());
    };

    if (id) {
      fetchTodo();
    }
  }, [id])

  if (!todo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>タイトル</h3>
      <p>{todo.title}</p>
      <h3>内容</h3>
      <p>{todo.content}</p>
      <h3>ステータス</h3>
      <p>{todo.status}</p>
      <h3>作成日時</h3>
      <p>{todo.createdAt.toString().slice(0, -16)}</p>
      <Link href="/todos/edit/${todo.id}">編集する</Link>
      <button type="submit">削除する</button>
      <Link href="/todos">戻る</Link>
    </div>
  )
}
