const API_URL = import.meta.env.VITE_API_URL;

type EndPoints =
  | "resources/"
  | "users/lists"
  | "roles/"
  | "bookmarks/"
  | "bookmarks";

const END_POINTS = {
  resources: {
    lists: "resources/" as EndPoints,
    post: "resources/" as EndPoints,
  },
  bookmarks: {
    get: "bookmarks/" as EndPoints,
    post: "bookmarks" as EndPoints,
    delete: "bookmarks" as EndPoints,
  },
  roles: {
    lists: "users/user-signedin-as?github_id=" as EndPoints,
    post: "roles/" as EndPoints,
  },
};

export { API_URL, END_POINTS };
