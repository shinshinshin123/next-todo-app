import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFirestore } from "reactfire";

export default function Edit() {
  return (
    <div>
      <h1>Edit Todo</h1>
      <Link href="/todos">戻る</Link>
      <form onSubmit={editSubmit}>
       <div>
         <label htmlFor="title">タイトル</label>
         <input
           type="text"
           id="title"
           name="title"
           value={formValues.title}
           onChange={handleChange}
         />
       </div>
      </form>
      <button type="submit">保存</button>
    </div>
  )
}
