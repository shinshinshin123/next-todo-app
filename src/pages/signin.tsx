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
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Eメール</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Eメール"
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            name="password"
            id="email"
            value={formData.passsword}
            onChange={handleInputChange}
            placeholder="パスワード"
            required
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
