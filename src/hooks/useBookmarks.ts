import { useState, useEffect, useContext } from "react";
import { getBookmarks } from "../api/endPointBookmark";
import { Bookmark, IntResource, IntBookmarkElement } from "../types";
import CtxUser from "../context";

export const useGetBookmarksList = (resources: IntResource[]) => {
  const userContext = useContext(CtxUser);
  const user = userContext?.user || null;

  const [filteredResources, setFilteredResources] = useState<
    IntBookmarkElement[]
  >([]);

  useEffect(() => {
    if (!user || user.role === "anonymous") {
      setFilteredResources([]);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const fetchedBookmarks: Bookmark[] = await getBookmarks(
          user.id.toString(),
        );

        const filteredBookmarks: IntBookmarkElement[] = resources
          .filter((resource) =>
            fetchedBookmarks.some(
              (bookmark) => bookmark.resource_id === resource.id,
            ),
          )
          .map((resource) => {
            const matchedBookmark = fetchedBookmarks.find(
              (bookmark) => bookmark.resource_id === resource.id,
            );

            return {
              id: resource.id!,
              github_id: matchedBookmark?.github_id || 0,
              title: resource.title,
              description: resource.description,
              url: resource.url,
              created_at: matchedBookmark?.created_at || "",
            };
          });

        setFilteredResources(filteredBookmarks);
      } catch {
        setFilteredResources([]);
      }
    };

    fetchBookmarks();
  }, [user, resources]);

  return filteredResources;
};
