import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password, userName } = fromData;
      const { user } = await auth.createUserWithEmailAndpassword(email, password);
      await user.updateProfile({ userName });
      router.push('/')
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            value={formData.email}
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
            value={formData.userName}
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
            ログインはこちら
          </Link>
        </p>
      </form>
    </div>
  )
}
