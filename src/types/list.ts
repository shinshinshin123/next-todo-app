// todolistの型定義
interface TodoList {
    id: string;
    title: string;
    content: string;
    status: string;
    createdAt: Date;
}

export interface TodoItemProps {
    todo: TodoList;
}
