import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { collection, addDoc, serverTimestamp, getFirestore } from "@firebase/firestore";


export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const firebase = getFirestore();
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    status: ""
  })

  // 該当するtodoの情報を取得するまでの間にloading出す。
  if (!todo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Edit Todo</h1>
      <Link href="/todos">戻る</Link>
      <form onSubmit={editSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">内容</label>
          <input
            id="content"
            value={todo.content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <label htmlFor="status">ステータス</label>
          <select id="status" value={todo.status} onChange={handleStatusChange}>
            <option value="未完了">未完了</option>
            <option value="途中">途中</option>
            <option value="完了">完了</option>
          </select>
        </div>
      </form>
      <button type="submit">保存</button>
    </div>
  )
}
