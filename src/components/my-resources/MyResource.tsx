import { FC } from "react";
import { IntResource } from "../../types";

type MyResourceProps = {
  resource: IntResource;
};

export const MyResource: FC<MyResourceProps> = ({ resource }) => {
  return (
    <article className="flex items-start mb-6">
      <div className="w-full">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="!text-gray-500 hover:!text-gray-800"
        >
          <h4 className="color-inherit font-bold">{resource.title}</h4>
          <p className="color-inherit font-normal">{resource.description}</p>
        </a>
      </div>
    </article>
  );
};
