import { FC } from "react";
import { IntResource } from "../../types";

import { MyResource } from "./MyResource";

interface ListMyResourcesProps {
  myResources: IntResource[];
}

export const ListMyResources: FC<ListMyResourcesProps> = ({ myResources }) => {
  return (
    <article
      data-testid="my-resources-container"
      className="bg-white overflow-x-hidden overflow-y-auto lg:max-h-[calc((100vh-110px)/2)] sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6"
    >
      <h3 className="text-[22px] font-bold mb-10">Mis recursos</h3>

      <div className="space-y-8">
        {myResources.map((resource, index) => (
          <MyResource key={index} resource={resource} />
        ))}
      </div>
    </article>
  );
};
