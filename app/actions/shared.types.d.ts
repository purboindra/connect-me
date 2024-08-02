export interface FetchPostByUserIdParams {
  userId: string;
}
export interface FetchPostByIdParams {
  postId: string;
}

export interface FetchPostByHashtagParams {
  name: string;
}

export interface FetchSavedPostByuserIdParams {
  userId: string;
}

export interface FetchUserByIdParams {
  userId: string;
}

export interface FetchUserByUsernameParams {
  username: string;
}
export interface EditUserParams {
  userId: string;
  username: string;
  bio: string;
  image_url: string;
  pathname: string;
}
