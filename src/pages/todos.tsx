import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs} from "@firebase/firestore";
import { db } from "src/lib/firebase";
import { Todo, Filter } from "src/types/todo";
import StatusFilter from "../components/StatusFilter";

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        status: doc.data().status,
        createdAt: doc.data().createdAt.toDate()
      }));
      const todos = todosData as Todo[]
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  //　ステータスフィルター
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

  // ソート
  const sortedTodos = filteredTodos.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sort === "asc") {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  return (
    <div>
      <h1>TODO一覧ページ</h1>
      <div>
        <Link href="/">戻る</Link>
      </div>
      <div>
        <Link href="/todos/create">TODO作成</Link>
      </div>
      {/* ステータスフィルター */}
      <div>
        <StatusFilter filter={filter} setFilter={setFilter}/>
      </div>
      <div>
        <button onClick={() => setSort("asc")}>日付（昇順）</button>
        <button onClick={() => setSort("desc")}>日付（降順）</button>
      </div>
      {sortedTodos.map((todo:Todo) => (
        <div key={todo.id}>
          <h3>タイトル</h3>
          <p>{todo.title}</p>
          <h3>内容</h3>
          <p>{todo.content}</p>
          <h3>ステータス</h3>
          <p>{todo.status}</p>
          <h3>作成日時</h3>
          <p>{todo.createdAt.toLocaleString()}</p>
          <p><Link href={`/todos/${todo.id}`}>詳細</Link></p>
          {/* 仮の編集リンク */}
          <p><Link href={`/todos/edit/${todo.id}`}>編集</Link></p>
        </div>
      ))}
    </div>
  )
}
