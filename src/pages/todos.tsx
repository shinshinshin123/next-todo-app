import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import { db } from "src/lib/firebase";

//　後ほど型定義ファイルを作り分ける
type Todo = {
    id: number;
    title: string;
    content: string;
    status: string;
}

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState<Filter>("all")

  useEffect(() => {
    const fetchTodos = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todosData = querySnapshot.docs.map((doc) => (doc.data()));
        setTodos(todosData);
    };
    fetchTodos();
  }, []);

  type Filter = "all" |"completed" | "inProgress" | "inComplete";

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "completed":
        return todo.status === "完了";
      case "inProgress":
        return todo.status === "途中";
      case "inComplete":
        return todo.status === "未完了";
      case "all":
        return true;
      default:
        return true;
    }
  });

  return (
    <div>
      <h1>TODO一覧ページ</h1>
      <Link href="/todos/create">TODO作成</Link>
      <div>
        <button onClick={() => setFilter("completed")}>完了</button>
        <button onClick={() => setFilter("inProgress")}>途中</button>
        <button onClick={() => setFilter("inComplete")}>未完了</button>
        <button onClick={() => setFilter("all")}>全て</button>
      </div>
      {filteredTodos.map((todo:Todo) => (
        <div key={todo.id}>
          <h3>タイトル</h3>
          <p>{todo.title}</p>
          <h3>内容</h3>
          <p>{todo.content}</p>
          <h3>ステータス</h3>
          <p>{todo.status}</p>
          <p><Link href={`/todos/${todo.id}`}>詳細</Link></p>
        </div>
      ))}
    </div>
  )
}
