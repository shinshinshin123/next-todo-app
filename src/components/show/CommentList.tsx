import { Comment } from "@/src/types/Comment";

type CommentListProps = {
  comments: Comment[];
};

export default function CommentListProps({ comments }: CommentListProps) {
  return (
    <div>
      <h2>コメント一覧</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.content}</p>
            <p>{comment.createdAt.toDate().toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
