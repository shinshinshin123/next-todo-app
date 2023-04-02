import React from "react";
import Link from "next/link";

export default function Edit() {
    return (
        <div>
            <h1>編集ページ</h1>
            <Link href="/todos">戻る</Link>
        </div>
    )
}
