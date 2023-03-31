import React from "react";
import Link from "next/link";

export default function Todos() {
    return (
        <>
            <h1>TODO一覧ページ</h1>
            <Link href="/todos/create">追加</Link>
        </>
    )
}
