import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "src/lib/firebase";
import TodoEdit from "src/components/edit/TodoEdit";

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

  const handleEditSubmit = async (e: any) => {
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
    <TodoEdit
      handleTitleChange={handleTitleChange}
      handleContentChange={handleContentChange}
      handleStatusChange={handleStatusChange}
      editSubmit={handleEditSubmit}
      todo={todo}
    />
  );
};
