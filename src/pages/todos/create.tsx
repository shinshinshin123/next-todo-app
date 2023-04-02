import React from "react";
import Link from "next/link";
import { db } from "src/lib/firebase";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { useState } from "react";
// import Header from "@/components/Header";

export default function Create() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("未完了")

  // TODO追加
  const addTodo = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //　タイトルの入力が空だった場合処理を中断する
    if(title.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        title: title,
        content: content,
        status: status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log("Document written with ID:", docRef.id);
    } catch(e) {
      console.log("Error adding document:", e);
    }
    // 入力後フォームを空にする
    setTitle("");
    setContent("");
    setStatus("")
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="タイトル"
          />
        </div>
        <div>
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="内容"
          />
        </div>
        <div>
          <label htmlFor="status">ステータス</label>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="未完了">未完了</option>
            <option value="途中">途中</option>
            <option value="完了">完了</option>
          </select>
        </div>
        <button type="submit">追加</button>
      </form>
    </div>
  )
}
