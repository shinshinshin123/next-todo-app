import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Signin () {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })
  const [isLaoding, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleEmailChange = (e:any) => {
    setLoginInfo(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setLoginInfo(e.target.value);
  };

  const handleFormSubmit = async(e:any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

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
          ログイン
        </button>
        <button type="button" onClick={() => signIn('google')}>
          Googleアカウントでログイン
        </button>
      </form>
    </div>
  )
}
