import { SidebarLinkInterface } from "@/types";

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
    imgUrl: "/assets/icons/user.svg",
    label: "Profile",
    route: "/profile",
  },
];
