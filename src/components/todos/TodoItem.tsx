import React from "react";
import Link from "next/link";
import { TodoItemProps } from "../../types/todo";

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
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
  );
}
