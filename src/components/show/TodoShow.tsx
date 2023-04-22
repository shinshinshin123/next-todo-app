import { DocumentData } from "@firebase/firestore";
import Link from "next/link";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import TodoDelete from "./TodoDelete";

type TodoShowProps = {
  todo:DocumentData;
  handleDeleteTodo: () => Promise<void>;
}

export default function TodoShow({ todo, handleDeleteTodo }: TodoShowProps) {
  return (
    <div>
      <Link href="/todos/edit/${todo.id}">編集する</Link>
      {/* <TodoDelete  id={todo.id} handleDeleteTodo={handleDeleteTodo} /> */}
      <Link href="/todos">戻る</Link>
      <h1>タイトル</h1>
      <p>{todo.title}</p>
      <h2>内容</h2>
      <p>{todo.content}</p>
      <h2>ステータス</h2>
      <p>{todo.status}</p>
      <h2>作成日時</h2>
      <p>{todo.createdAt.toDate().toLocaleString()}</p>
      {/* <CommentList comments={todo.comments} />
      <CommentForm todoId={todo.id} /> */}
    </div>
  )
}
