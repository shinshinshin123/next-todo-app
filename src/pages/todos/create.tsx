import React from "react";
import Link from "next/link";
import { db } from "src/lib/firebase";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { useState } from "react";
// import Header from "@/components/Header";

export default function Create() {
  const [createTodo, setCreateTodo] = useState("")

  // TODO追加
  const addTodo = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //　入力が空だった場合処理を中断する
    if(createTodo === "") return;
    await addDoc(collection(db, 'todos'), {
      title: createTodo,
      // content: createTodo,
      // status: createTodo,
      createdAt: serverTimestamp(),
    });
    // 入力後フォームを空にする
    setCreateTodo("");
  };

  return (
    <div>
      <h1>Create Todo</h1>
        <Link href="/todos">戻る</Link>
      <form onSubmit={addTodo}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setCreateTodo(e.target.value)}
            value={createTodo}
            placeholder="タイトル"
          />
        </div>
        <div>
          <label htmlFor="content">内容</label>
        </div>
        <button type="submit">追加</button>
      </form>
    </div>
  )
}
