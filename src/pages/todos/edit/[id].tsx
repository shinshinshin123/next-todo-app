import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "src/lib/firebase";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    status: ""
  })

  useEffect(() => {
    const fetchTodo = async () => {
    if (id) {
      const todoRef = doc(db, "todos", id.toString());
      const docSnapshot = await getDoc(todoRef);
        if (docSnapshot.exists()) {
          const todoData = docSnapshot.data();
          setTodo({
            title: todoData.title,
            content: todoData.content,
            status: todoData.status
          })
        }
      }
    };
    fetchTodo();
  }, [id]);

  const editSubmit = async (e: any) => {
    e.preventDefault();
    const todoRef = doc(db, "todos", id!.toString());
    try {
      await updateDoc(todoRef, {
        title: todo.title,
        content: todo.content,
        status: todo.status,
      });
      router.push("/todos");
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
          <textarea
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
        <button type="submit">保存</button>
      </form>
    </div>
  )
}
