import { CommentData } from "./commentsDataTypes";

export interface PostData {
  postId: string;
  userId: string | null;
  location: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  comments: CommentData[];
}
