import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { IntResource, IntBookmarkElement } from "../types";
import { ListResources } from "../components/resources/ListResources";
import { getResources } from "../api/endPointResources";
import { categories } from "../data/categories";
import moock from "../moock/resources.json";
import { useGetBookmarksList } from "../hooks/useBookmarks";
import { createBookmark, deleteBookmark } from "../api/endPointBookmark";
import { useCtxUser } from "../hooks/useCtxUser";

const ResourcesPage: FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { user } = useCtxUser();

  const [apiResources, setApiResources] = useState<IntResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingBookmarks, setLoadingBookmarks] = useState(true);

  const [localBookmarkedResources, setLocalBookmarkedResources] = useState<
    IntBookmarkElement[]
  >([]);

  const apiBookmarkedResources = useGetBookmarksList(apiResources);

  useEffect(() => {
    if (apiBookmarkedResources.length > 0) {
      // Sort bookmarks by created_at in descending order
      const sortedBookmarks = [...apiBookmarkedResources].sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      setLocalBookmarkedResources(sortedBookmarks);
    }
    setLoadingBookmarks(false);
  }, [apiBookmarkedResources]);

  const toggleBookmark = async (resource: IntResource) => {
    if (!user) {
      return;
    }

    const isAlreadyBookmarked: boolean = localBookmarkedResources.some(
      (item: IntBookmarkElement) => item.id === resource.id,
    );

    try {
      setLocalBookmarkedResources((prev: IntBookmarkElement[]) => {
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
          return updatedBookmarks.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
        }
      });

      if (isAlreadyBookmarked) {
        await deleteBookmark(String(user.id), resource.id!);
      } else {
        await createBookmark(String(user.id), resource.id!);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setLocalBookmarkedResources(apiBookmarkedResources);
    }
  };

  useEffect(() => {
    if (!category) {
      navigate(`/resources/${categories[0]}`);
    }
  }, [category, navigate]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        setLoadingBookmarks(true);
        const data = await getResources();
        setApiResources(data);
      } catch (error) {
        console.error(
          "No se han podido obtener los recursos. Se cargan los recursos de moock.",
          error,
        );
        setApiResources(moock.resources as IntResource[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Obteniendo los recursos...</div>
      ) : (
        <ListResources
          resources={apiResources}
          loadingBookmarks={loadingBookmarks}
          bookmarkedResources={localBookmarkedResources}
          toggleBookmark={toggleBookmark}
          category={category as keyof typeof categories | undefined}
        />
      )}
    </>
  );
};

export default ResourcesPage;
