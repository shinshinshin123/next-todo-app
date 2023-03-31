import React from "react";
import Link from "next/link";
import { useState } from "react";
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
        <p>ステータス</p>
          <label>
            <input type="radio" value="完了"/>
            完了
          </label>
          <label>
            <input type="radio" value="途中"/>
            途中
          </label>
          <label>
            <input type="radio" value="未完了"/>
            未完了
          </label>
        <p><button>作成</button></p>
      </form>
    </>
  )
}
