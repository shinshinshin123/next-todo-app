import React from "react";
import Link from "next/link";
import { db } from "src/lib/firebase";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { useState } from "react";

export default function Create() {
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
    status: "未完了",
  });

  // TODO追加
  const addTodo = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //　タイトルの入力が空だった場合処理を中断する
    if(todoData.title.trim() === "") return;

    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        title: todoData.title,
        content: todoData.content,
        status: todoData.status,
        createdAt: serverTimestamp()
      });
      console.log("Document written with ID:", docRef.id);
    } catch(e) {
      console.log("Error adding document:", e);
    }
    // 入力後フォームを空にする
    setTodoData({
      title: "",
      content: "",
      status: "未完了",
    })
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value
    });
  }

  return (
    <div>
      <h1>Create Todo</h1>
      <Link href="/todos">戻る</Link>
      <form onSubmit={addTodo}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            value={todoData.title}
            onChange={handleInputChange}
            placeholder="タイトル"
            name="title"
          />
        </div>
        <div>
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            onChange={handleInputChange}
            value={todoData.content}
            placeholder="内容"
            name="content"
          />
        </div>
        <div>
          <label htmlFor="status">ステータス</label>
          <select value={todoData.status} onChange={handleInputChange} name="status">
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
