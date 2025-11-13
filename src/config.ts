const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/";

type EndPoints =
  | "resources/"
  | "users/lists"
  | "roles/"
  | "bookmarks/"
  | "bookmarks"
  | "likes/"
  | "tags/"
  | "tags/category-frequency"
  | "feature-flags/"
  | "feature-flags/role-self-assignment"
  | "tags/by-category"
  | "technical-tests"
  | "codeconnect";

const END_POINTS = {
  resources: {
    lists: "resources/" as EndPoints,
    post: "v2/resources/" as EndPoints,
  },
  bookmarks: {
    get: "bookmarks" as EndPoints,
    post: "bookmarks" as EndPoints,
    delete: "bookmarks" as EndPoints,
  },
  roles: {
    lists: "users/user-signedin-as?github_id=" as EndPoints,
    post: "roles/" as EndPoints,
    put: "roles/" as EndPoints,
  },
  likes: {
    get: "likes" as EndPoints,
    post: "likes" as EndPoints,
    delete: "likes" as EndPoints,
  },
  tags: {
    get: "tags/" as EndPoints,
    categoryFrequency: "tags/category-frequency" as EndPoints,
    byCategory: "tags/by-category" as EndPoints,
  },
  devTools: {
    roleChange: "feature-flags/role-self-assignment" as EndPoints,
  },
  technicaltests: {
    create: "technical-tests" as EndPoints,
    get: "technical-tests" as EndPoints,
  },
  codeconnect: {
    post: "codeconnect" as EndPoints,
  },
};

export { API_URL, END_POINTS };
