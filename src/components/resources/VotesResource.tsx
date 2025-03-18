import { FC } from "react";
import arrowDown from "../../assets/svg/chevron_forward_down.svg";
import arrowTop from "../../assets/svg/chevron_forward_top.svg";
interface VotesResource {
  votes: number;
}

export const VotesResource: FC<VotesResource> = ({ votes }) => {
  return (
    <article
      data-testid="resource-votes"
      className="flex flex-col items-center "
    >
      <img src={arrowTop} alt="icon" width={16} height={16.1} />
      <span className="inline-flex text-[16px] text-[#282828]">
        <strong>{votes}</strong>
      </span>
      <img src={arrowDown} alt="icon" width={16} height={16.1} />
    </article>
  );
};
