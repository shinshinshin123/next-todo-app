import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Edit() {
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
            value={todoTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">内容</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todoContent}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <label htmlFor="status">ステータス</label>
          <select id="status" value={todoStatus} onChange={handleStatusChange}>
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
