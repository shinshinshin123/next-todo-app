import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, auth } from "src/lib/firebase";

export default function Signin () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  //　通常のログイン
  const handleLogin = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/');
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Googleアカウントでログインする
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            value={formData.password}
            onChange={handleInputChange}
            placeholder="パスワード"
            required
          />
        </div>
        <div>
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {/* ログインする */}
            {isLoading ? 'ロード中...' : 'ログイン'}
          </button>
        </div>
        <div>
          <button type="button" onClick={handleGoogleLogin} disabled={isLoading}>
            {/* Googleアカウントでログイン */}
            {isLoading ? 'ロード中...' : 'Googleアカウントでログイン'}
          </button>
        </div>
      </form>
    </div>
  )
}
