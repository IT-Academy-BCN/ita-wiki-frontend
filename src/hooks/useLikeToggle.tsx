import { useCallback } from "react";
import { createLike, deleteLike } from "../api/likesApi";
import { useCtxUser } from "../hooks/useCtxUser";

export const useLikeToggle = () => {
  const { user } = useCtxUser();

  const toggleLike = useCallback(
    async (resource_id: number, isLiked: boolean) => {
      if (
        !user ||
        user.role !== "student" ||
        typeof user.github_id !== "number"
      ) {
        console.warn("User not allowed to vote.");
        return { success: false };
      }

      const github_id = user.github_id;

      try {
        if (isLiked) {
          const ok = await deleteLike(github_id, resource_id);
          return { success: ok, action: "deleted" };
        } else {
          const like = await createLike(github_id, resource_id);
          return { success: !!like, action: "created" };
        }
      } catch (err) {
        console.error("Toggle error:", err);
        return { success: false };
      }
    },
    [user],
  );

  return { toggleLike };
};
