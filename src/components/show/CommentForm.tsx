import React, { useState } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { Comment } from "src/types/Comment";

type CommentFormProps = {
  todoId: string;
};

export default function CommentForm({ todoId }: CommentFormProps) {
  const [comment, setComment] = useState({
    name: "",
    content: "",
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment({
      ...comment,
      name: e.target.value,
    });
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
        content: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment: Comment = {
      name: comment.name,
      content: comment.content,
      createdAt: new Date(),
    };
    await addDoc(collection(doc(db, "todos", todoId), "comments"), newComment);
    setComment({
      name: "",
      content: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>コメントを投稿する</h2>
      <div>
        <label htmlFor="name">名前</label>
        <input
          type="text"
          id="name"
          value={comment.name}
          onChange={handleChangeName}
        />
      </div>
      <div>
        <label htmlFor="conetnt">コメント</label>
        <textarea
          id="content"
          value={comment.content}
          onChange={handleChangeContent}
        />
      </div>
      <button type="submit">投稿する</button>
    </form>
  )
};
