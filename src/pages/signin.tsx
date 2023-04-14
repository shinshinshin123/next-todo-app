import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "react";
import { signInWithEmailAndPassword, signInWithGoogle } from '../lib/firebase';

export default function Signin () {

  return (
    <div>
      <h1>ログイン</h1>
      <Link href="/todos">戻る</Link>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Eメール</label>
          <input
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Eメール"
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="email"
            value={passsword}
            onChange={handlePasswordChange}
            placeholder="パスワード"
          />
        </div>
        <div>
        </div>
        <button type="submit" disabled={isLaoding}>
          {/* ログインする */}
          {isLoding ? 'ロード中...' : 'ログイン'}
        </button>
        <button type="button" onClick={handleGoogleLogin} disabled={isLoading}>
          {/* Googleアカウントでログイン */}
          {isLoding ? 'ロード中...' : 'Googleアカウントでログイン'}
        </button>
      </form>
    </div>
  )
}
