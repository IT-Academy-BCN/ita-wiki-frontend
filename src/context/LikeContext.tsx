import { createContext, useEffect, useState } from "react";
import { getLikes } from "../api/likesApi";
import { useUserContext } from "../context/UserContext";

interface LikeContextType {
  likedResourceIds: number[];
  refreshLikes: () => void;
  setLikedResourceIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const LikeContext = createContext<LikeContextType>({
  likedResourceIds: [],
  refreshLikes: () => {},
  setLikedResourceIds: () => {},
});

export const LikesProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedResourceIds, setLikedResourceIds] = useState<number[]>([]);
  const { user } = useUserContext();

  const fetchLikes = async () => {
    if (!user?.id) return;
    const likes = await getLikes(user.id);
    const ids = likes.map((like) => like.resource_id);
    setLikedResourceIds(ids);
  };

  useEffect(() => {
    fetchLikes();
  }, [user?.id]);

  const value = {
    likedResourceIds,
    refreshLikes: fetchLikes,
    setLikedResourceIds,
  };

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};
