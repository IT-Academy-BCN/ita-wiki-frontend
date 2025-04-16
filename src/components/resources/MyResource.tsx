import { FC } from "react";
import { IntResource } from "../../types";

type MyResourceProps = {
  resource: IntResource;
};

export const MyResource: FC<MyResourceProps> = ({ resource }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block space-y-2"
    >
      <h3 className="text-[16px] font-bold text-[#282828]">{resource.title}</h3>
      <p className="text-[#808080] text-[12px]">{resource.description}</p>
    </a>
  );
};
