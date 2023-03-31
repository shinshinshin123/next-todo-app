import { useState } from "react";
import Router from "next/router";
import React from "react";
import Link from "next/link";
// import Header from "@/components/Header";

export default function Create() {
  return (
    <>
      <h1>todo作成ページ</h1>
      <Link href="/todos">戻る</Link>
    </>
  )
}
