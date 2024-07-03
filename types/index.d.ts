export interface SidebarLinkInterface {
  imgUrl: string;
  route: string;
  label: string;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
  token: string;
  refreshToken: string;
  likes: Array<String>;
  followers: Array<String>;
  following: Array<String>;
  posts: Array<String>;
}

export interface SuggestedPeopleInterface {
  id: string;
  username: string;
  name: string;
  photoUrl: string;
}
