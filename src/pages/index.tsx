import React from "react"
import Link from "next/link"

export default function Todos() {
  return (
    <div>
      <h1>todoアプリ!!!</h1>
      <Link href="/todos">Todo一覧へ</Link>
      <Link href="/signin">ログイン</Link>
    </div>
  )
}
