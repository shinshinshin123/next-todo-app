import React from "react";
import Link from "next/link";
import { db } from "src/lib/firebase";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { useState } from "react";
import CreateFrom from "src/components/CreateFrom";

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
      <CreateFrom
        todoData={todoData}
        handleInputChange={handleInputChange}
        addTodo={addTodo}
      />
    </div>
  )
}
