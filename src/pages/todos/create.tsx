import React from "react";
import Link from "next/link";
// import Header from "@/components/Header";

export default function Create() {
  return (
    <>
      <h1>todo create</h1>
        <Link href="/todos">戻る</Link>
      <form>
        <p>タイトル</p>
          <input placeholder="タイトル"/>
        <p>内容</p>
          <textarea placeholder="内容"/>
        <p><button>作成</button></p>
      </form>
    </>
  )
}
