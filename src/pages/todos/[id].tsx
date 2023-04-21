import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";
import TodoShow from "src/components/show/TodoShow";

export default function Show() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<DocumentData & { comments?: Comment[]}| null>(null);

  //個別のtodo(id)をfirestoreのdbから持ってくる
  useEffect(() => {
    const fetchTodo = async () => {
      if(id) {
        const todoRef = doc(db, "todos", id.toString());
        const docSnapshot = await getDoc(todoRef);
        if (docSnapshot.exists()) {
          setTodo(docSnapshot.data());
        }
      }
    };
    fetchTodo();
  }, [id])

  // todoのidを取得するまでにLodingを画面を出す。
  if (!todo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TodoShow todo={todo} />
    </div>
  );
};
