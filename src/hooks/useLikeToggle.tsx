import { useCallback } from "react";
import { createLike, deleteLike } from "../api/likesApi";
import { useUserContext } from "../context/UserContext";

export const useLikeToggle = () => {
  const { user } = useUserContext();

  const toggleLike = useCallback(
    async (resource_id: number, isLiked: boolean) => {
      if (!user || user.role !== "student" || typeof user.id !== "number") {
        console.warn("User not allowed to vote.");
        return { success: false };
      }

      const github_id = user.id;

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
