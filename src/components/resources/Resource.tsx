import { FC } from "react";
import { IntResource } from "../../types";
import { BodyResource } from "./BodyResource";
import { ContentResource } from "./ContentResource";
import { VotesResource } from "./VotesResource";
import { UserResource } from "./UserResource";
import { FooterResource } from "./FooterResource";
import BookmarkIconComponent from "./BookmarkIconComponent";
type ResourceProps = {
  resource: IntResource;
};

export const Resource: FC<ResourceProps> = ({ resource }) => {
  return (
    <li
      role="resources"
      className="border-[1px] border-[#7E7E7E] rounded-[20px] w-full lg:max-w-[467.27px]"
      data-testid="resource"
    >
      <BodyResource>
        <VotesResource votes={resource.votes ?? 0} />
        <ContentResource>
          <h3 className="px-4 text-[16px] font-extrabold text-[#282828]">
            {resource.title}
          </h3>
          <p className="p-1 px-4 text-[#808080] text-[12px]">
            Reprehenderit laborum cillum anim section.
          </p>
        </ContentResource>
        <BookmarkIconComponent marked={false} />
      </BodyResource>
      <FooterResource>
        <>
          <UserResource
            user={{
              id: 123456,
              displayName: "Luisvi",
              photoURL:
                "https://media-protected.taiga.io/user/e/a/5/1/5b4f35ce88a65723e51c03d9ec16eab9fa397c4489179eec3c8cb18454ba/foto-cv-luis-vicente-2-1.jpg.300x300_q85_crop.jpg?token=Z74AuQ%3Ay4emwkV17L87H0TeHlRkVQ8ullh7ZWESpQTvvQBBn-3yet4vmvAXIWFdrh-Ugz7cF19-NBqrOAoR0_LqIIJMkw",
            }}
          />
          {`,`}
          <span className="text-[#808080] font-bold">
            {resource.create_at ? resource.create_at : resource.create_at}
          </span>{" "}
        </>
      </FooterResource>
    </li>
  );
};
