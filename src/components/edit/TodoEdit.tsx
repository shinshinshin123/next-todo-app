import React from "react";
import Link from "next/link";

interface todoEdit {
  title: string;
  content: string;
  status: string;
}

interface EditProps {
  todo: todoEdit
  editSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Edit({
  todo,
  editSubmit,
  handleTitleChange,
  handleContentChange,
  handleStatusChange,
}: EditProps) {
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
  );
};
