import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "src/lib/firebase";

export default function Todos() {
  return (
    <>
      <h1>TODO一覧ページ</h1>
      <Link href="/todos/create">TODO作成</Link>
    </>
  )
}
