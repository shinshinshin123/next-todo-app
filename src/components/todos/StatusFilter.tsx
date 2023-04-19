import React, { SetStateAction } from "react";
import { Filter } from "../../types/todo";

type Props = {
  filter: string;
  setFilter: (filter: SetStateAction<Filter>) => void;
};

export default function StatusFilter({ filter, setFilter }: Props) {
  return (
    <div>
      <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>完了</button>
      <button onClick={() => setFilter("inProgress")} disabled={filter === "inProgress"}>途中</button>
      <button onClick={() => setFilter("inComplete")} disabled={filter === "inComplete"}>未完了</button>
      <button onClick={() => setFilter("all")} disabled={filter === "all"}>全て</button>
    </div>
  )
}
