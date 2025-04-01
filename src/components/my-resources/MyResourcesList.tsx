import { FC, useEffect, useState } from "react";
import { IntResource } from "../../types";
import { MyResource } from "./MyResource";

interface ListMyResourcesProps {
  myResources: IntResource[];
  isLoading?: boolean;
}

export const ListMyResources: FC<ListMyResourcesProps> = ({
  myResources,
  isLoading = false,
}) => {
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isLoading && myResources.length === 0) {
      timer = setTimeout(() => {
        setShowEmptyMessage(true);
      }, 1000);
    } else {
      setShowEmptyMessage(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, myResources]);

  return (
    <div
      data-testid="my-resources-container"
      className="bg-white overflow-y-auto h-[40vh] max-h-[400px] sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6"
    >
      <h3 className="text-[22px] font-bold mb-8">Mis recursos</h3>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#B91879]"></div>
        </div>
      ) : (
        <>
          {myResources.length > 0 ? (
            <>
              {myResources.map((resource, index) => (
                <MyResource key={index} resource={resource} />
              ))}
            </>
          ) : showEmptyMessage ? (
            <p>Todavía no has creado ningún recurso.</p>
          ) : null}
        </>
      )}
    </div>
  );
};
