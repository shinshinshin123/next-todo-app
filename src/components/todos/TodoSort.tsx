import React from "react";

type Props = {
  sort: "asc" | "desc",
  setSort: React.Dispatch<React.SetStateAction<"asc" | "desc">> | null
}

export default function Sort(props: Props) {
  const { sort, setSort } = props;

  if (setSort === null) {
    return null;
  }

  return(
    <div>
      <button onClick={() => setSort("asc")} disabled={sort === "asc"}>日付（昇順）</button>
      <button onClick={() => setSort("desc")} disabled={sort === "desc"}>日付（降順）</button>
    </div>
  )
};
