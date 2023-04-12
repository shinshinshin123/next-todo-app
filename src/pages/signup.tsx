import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup () {
  return (
    <div>
      <h1>新規登録</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleNerSubmit}>
         <div>
          <label htmlFor="email">Eメール</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="userName">ユーザーネーム</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <button type="submit">新規登録</button>
      </form>
      <p>
        すでにアカウントを持っていますか？ <Link href="/signin">ログイン</Link>
      </p>
    </div>
  )
}
