import React from "react";
import Link from "next/link";

export default function Mypage () {
  return (
    <div>
      <header>
        <h1>マイページ</h1>
      </header>
      <main>
        {session ?  (
            <>
              <h2>ユーザー情報</h2>
              {userInfo && (
                <ul>
                    <li>ユーザーID: {userInfo.uid}</li>
                    <li>ユーザー名: {userInfo.userName}</li>
                    <li>最終ログイン日時: {userInfo.lastlogin}</li>
                </ul>
              )}
              <form onSubmit={handleUserInfoEdit}>
                <h2>ユーザー情報編集</h2>
                <div>
                    <label htmlFor="userName">名前</label>
                    <input type="text" name="userName" required />
                </div>
                <button type="submit">更新する</button>
              </form>
            </>
        ) : (
            <p>ログインしてください</p>
        )}
      </main>
      <footer>
        <ul>
            <li>
                <a href="#">ユーザー</a>
            </li>
            <li>
                <a href="#">TODO</a>
            </li>
        </ul>
      </footer>
    </div>
  )
}
