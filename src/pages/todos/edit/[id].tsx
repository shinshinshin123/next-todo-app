import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { getFirestore, doc, updateDoc} from "@firebase/firestore";
import { db } from "src/lib/firebase";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const firebase = getFirestore();
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    status: ""
  })

  useEffect(() => {
    if (id) {
      const todoRef = doc(firestore, "todos", id.toString());
      todoRef
        .get()
        .then((docSnapshot :any) => {
          if (docSnapshot.exists()) {
            setTodo(docSnapshot.data());
          }
        })
        .catch((error: any) => {
          console.error(error)
        });
    }
  }, [id])

  const editSubmit = async (e: any) => {
    e.preventDefault();
    const todoRef = doc(db, "todos", id.toString());
    try {
      await updateDoc(todoRef, {
        title: todo.title,
        content: todo.content,
        status: todo.status,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e :any) => {
    setTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const handleContentChange = (e :any) => {
    setTodo({
      ...todo,
      content: e.target.value,
    });
  };

  const handleStatusChange = (e :any) => {
    setTodo({
      ...todo,
      status: e.target.value,
    });
  };

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
