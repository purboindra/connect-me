export interface SidebarLinkInterface {
  imgUrl: string;
  route: string;
  label: string;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  bio: string;
  photoUrl: string;
  token: string;
  refreshToken: string;
  likes: Array<string>;
  followers: Array<any>;
  following: Array<any>;
  posts: Array<string>;
}

export interface SuggestedPeopleInterface {
  id: string;
  username: string;
  name: string;
  photoUrl: string;
}

export interface LikeInterface {
  userId: string;
  postid: string;
  createdAt: number;
}

export interface LikeCommentInterface {
  userId: string;
  commentId: string;
  createdAt: number;
}
export interface SaveInterface {
  id: string;
  userId: string;
  postid: string;
  createdAt: number;
}
export interface CommentInterface {
  id: string;
  userId: string;
  postid: string;
  createdAt: number;
  content: string;
  author: UserInterface;
  likes: Array<LikeCommentInterface>;
}

export interface PostInterface {
  id: string;
  authorId: string;
  title: string;
  content: string;
  imageUrl: string?;
  created_at: number;
  author: UserInterface;
  likes: Array<LikeInterface>;
  comments: Array<CommentInterface>;
  savedBy: Array<SaveInterface>;
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
