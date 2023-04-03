import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "src/lib/firebase";

//　後ほど型定義ファイルを作り分ける
type Todo = {
    id: number;
    title: string;
    content: string;
    status: string;
    createdAt: string;
}

export default function Todos({todos}:{todos:Todo[]}) {
  return (
    <div>
      <h1>TODO一覧ページ</h1>
      <Link href="/todos/create">TODO作成</Link>
      {todos.map((todo:Todo) => (
        <div key={todo.id}>
          <h3>タイトル</h3>
          <p>{todo.title}</p>
          <h3>内容</h3>
          <p>{todo.content}</p>
          <h3>ステータス</h3>
          <p>{todo.status}</p>
          <h3>作成日</h3>
          <p>{todo.createdAt}</p>
          <p><Link href={`/todos/${todo.id}`}>詳細</Link></p>
          <p><Link href={`/todos/edit/${todo.id}`}>編集</Link></p>
        </div>
      ))}
    </div>
  )
}
