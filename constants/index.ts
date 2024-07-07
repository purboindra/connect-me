import { SidebarLinkInterface, SuggestedPeopleInterface } from "@/types";

export const sidebarLinks: SidebarLinkInterface[] = [
  {
    imgUrl: "/assets/icons/home.svg",
    label: "Home",
    route: "/",
  },
  {
    imgUrl: "/assets/icons/search.svg",
    label: "Search",
    route: "/search",
  },
  {
    imgUrl: "/assets/icons/add-post.svg",
    label: "Create",
    route: "/create",
  },
  {
    imgUrl: "/assets/icons/comment.svg",
    label: "Message",
    route: "/message",
  },
  {
    imgUrl: "/assets/icons/bookmark.svg",
    label: "Saved Post",
    route: "/saved-post",
  },
];

export const suggestedPeople: SuggestedPeopleInterface[] = [
  {
    id: "1",
    name: "Helena Hills",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@helenahills",
  },
  {
    id: "2",
    name: "Charles Tran",
    photoUrl:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=3376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@charlestrans",
  },
  {
    id: "3",
    name: "Oscar Davis",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@oscardavis",
  },
  {
    id: "4",
    name: "Carlo Rojas",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1682681907111-c13bc10b1587?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@carlorojas",
  },
];

export const communities: SuggestedPeopleInterface[] = [
  {
    id: "1",
    name: "Carlo Rojas",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1682681907111-c13bc10b1587?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@carlorojas",
  },
  {
    id: "2",
    name: "Helena Hills",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@helenahills",
  },
  {
    id: "3",
    name: "Oscar Davis",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "@oscardavis",
  },
];
