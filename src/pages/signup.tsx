import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup () {
  return (
    <div>
      <h1>新規登録</h1>
      <form onSubmit={handleSignup}>
         <div>
          <label htmlFor="email">Eメール</label>
          <input
            type="email"
            id="email"
            name="email"
            value={fromData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userName">ユーザーネーム</label>
          <input
            type="text"
            id="userName"
            value={fromData.userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'ローディング中...' : '新規登録'}
        </button>
        <p>
          すでにアカウントを持っていますか？{' '}
          <Link href="/signin">
            ログインする
          </Link>
        </p>
      </form>
    </div>
  )
}
