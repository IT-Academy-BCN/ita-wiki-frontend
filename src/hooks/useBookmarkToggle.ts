import { IntResource, IntBookmarkElement } from "../types";
import { useUserContext } from "../context/UserContext";
import { createBookmark, deleteBookmark } from "../api/endPointBookmark";
import { canBookmark } from "../data/permission/tempRolesPremission";

export function useBookmarkToggle() {
  const { user } = useUserContext();

  const toggleBookmark = async (
    resource: IntResource,
    bookmarkedResources: IntBookmarkElement[],
    setBookmarkedResources: React.Dispatch<
      React.SetStateAction<IntBookmarkElement[]>
    >,
  ) => {
    if (!user || !canBookmark(user.role)) {
      return;
    }

    const isAlreadyBookmarked: boolean = bookmarkedResources.some(
      (item: IntBookmarkElement) => item.id === resource.id,
    );

    try {
      setBookmarkedResources((prev: IntBookmarkElement[]) => {
        if (isAlreadyBookmarked) {
          return prev.filter(
            (item: IntBookmarkElement) => item.id !== resource.id,
          );
        } else {
          const newBookmark = {
            id: resource.id!,
            github_id: user.id,
            title: resource.title,
            description: resource.description,
            url: resource.url,
            created_at: new Date().toISOString(),
          } as IntBookmarkElement;

          const updatedBookmarks = [...prev, newBookmark];
          return updatedBookmarks.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
        }
      });

      if (isAlreadyBookmarked) {
        await deleteBookmark(user.id, resource.id!);
      } else {
        await createBookmark(user.id, resource.id!);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      throw error;
    }
  };

  return {
    toggleBookmark,
  };
}
