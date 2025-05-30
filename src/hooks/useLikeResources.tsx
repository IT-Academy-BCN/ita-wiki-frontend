import { useContext, useEffect, useState } from "react";
import { LikeContext } from "../context/LikeContext";
import { useLikeToggle } from "./useLikeToggle";
import { IntResource } from "../types";
import { useUserContext } from "../context/UserContext";
import { useResources } from "../context/ResourcesContext";

export function useLikeResources(resource: IntResource) {
  const { likedResourceIds, setLikedResourceIds } = useContext(LikeContext);
  const { toggleLike } = useLikeToggle();
  const { user } = useUserContext();
  const { refreshResources } = useResources();

  const allowedToVote = user?.role == "student" ? true : false;

  const resourceId = Number(resource.id);

  const [localLiked, setLocalLiked] = useState<boolean>(
    likedResourceIds.includes(resourceId),
  );
  const [localCount, setLocalCount] = useState<number>(
    resource.like_count ?? 0,
  );

  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!syncing) {
      setLocalLiked(likedResourceIds.includes(resourceId));
      setLocalCount(resource.like_count ?? 0);
    }
  }, [likedResourceIds, resourceId, syncing, resource.like_count]);

  const rollback = (wasLiked: boolean) => {
    setLocalLiked(wasLiked);
    setLocalCount((prev) => prev + (wasLiked ? -1 : 1)); // Restablecer el contador optimista
    setLikedResourceIds(likedResourceIds);
  };

  const handleLike = async () => {
    if (!allowedToVote || syncing) return;

    const wasLiked = localLiked;
    const newCount = localCount + (wasLiked ? -1 : 1);

    setLocalLiked(!wasLiked);
    setLocalCount(newCount);
    setSyncing(true);

    const optimisticIds = wasLiked
      ? likedResourceIds.filter((id) => id !== resourceId)
      : [...likedResourceIds, resourceId];
    setLikedResourceIds(optimisticIds);

    try {
      const result = await toggleLike(resourceId, wasLiked);
      if (!result?.success) {
        rollback(wasLiked);
      } else {
        await refreshResources();
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      rollback(wasLiked);
    } finally {
      setSyncing(false);
    }
  };

  return {
    liked: localLiked,
    voteCount: localCount,
    handleLike,
    disabled: !allowedToVote,
  };
}
