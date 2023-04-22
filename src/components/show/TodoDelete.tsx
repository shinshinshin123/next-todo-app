import React from "react";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "src/lib/firebase";

type Props = {
  id: string;
  handleDeleteTodo: () => void;
};

export default function DeleteButton({ id, handleDeleteTodo }: Props) {
  const handleDelete = async () => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    handleDeleteTodo();
  };

  return (
    <button onClick={handleDelete}>削除</button>
  );
}
