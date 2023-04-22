import { CreateFormProps } from "../../types/create"

export default function CreateFrom({ todoData, handleInputChange, addTodo }: CreateFormProps) {
  return (
    <form onSubmit={addTodo}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            value={todoData.title}
            onChange={handleInputChange}
            placeholder="タイトル"
            name="title"
          />
        </div>
        <div>
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            onChange={handleInputChange}
            value={todoData.content}
            placeholder="内容"
            name="content"
          />
        </div>
        <div>
          <label htmlFor="status">ステータス</label>
          <select value={todoData.status} onChange={handleInputChange} name="status">
            <option value="未完了">未完了</option>
            <option value="途中">途中</option>
            <option value="完了">完了</option>
          </select>
        </div>
        <button type="submit">追加</button>
      </form>
  )
};
