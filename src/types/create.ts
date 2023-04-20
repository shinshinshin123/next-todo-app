// todoの作成
export type CreateFormProps = {
    todoData: {
      title: string;
      content: string;
      status: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => void;
    addTodo: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};
