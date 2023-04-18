// todoの型定義
export interface Todo {
  id: string;
  title: string;
  content: string;
  status: "未完了" | "途中" | "完了";
  createdAt: Date;
}

// フィルターの型定義
export type Filter = "all" |"completed" | "inProgress" | "inComplete";

// todolistの型定義
export interface TodoList {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: Date;
}

export interface TodoItemProps {
  todo: TodoList;
}
