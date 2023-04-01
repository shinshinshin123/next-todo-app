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
    //　空欄だった場合保存できないようにする
    if(createTodo === "") return;
    await addDoc(collection(db, 'todos'), {
      title: createTodo,
      timestamp: serverTimestamp(),
    });
    // 入力後フォームを空にする　
    setCreateTodo("");
  };

  return (
    <>
      <h1>todo create</h1>
        <Link href="/todos">戻る</Link>
      <form onSubmit={addTodo}>
        <p>タイトル</p>
          <input onChange={(e) => setCreateTodo(e.target.value)} value={createTodo} placeholder="タイトル"/>
        {/* <p>内容</p>
          <textarea onChange={(e) => setCreateTodo(e.target.value)} value={createTodo} placeholder="内容"/>
        <p>ステータス</p>
          <label>
            <input onChange={(e) => setCreateTodo(e.target.value)} value={createTodo} type="radio" />
            完了
          </label>
          <label>
            <input onChange={(e) => setCreateTodo(e.target.value)} value={createTodo} type="radio"/>
            途中
          </label>
          <label>
            <input onChange={(e) => setCreateTodo(e.target.value)} value={createTodo} type="radio"/>
            未完了
          </label> */}
        <button>作成</button>
      </form>
    </>
  )
}
