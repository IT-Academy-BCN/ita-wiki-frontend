import { FC } from "react";
import edit from "../../../assets/edit.svg";

interface BookmarkProps {
  title: string;
  description: string;
  url: string;
}
const BookmarkComponent: FC<BookmarkProps> = ({ title, description, url }) => {
  return (
    <article className="flex  items-start mb-6">
      <div className="w-full">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="!text-gray-500 hover:!text-gray-800"
        >
          <h4 className="color-inherit font-bold">{title}</h4>
          <p className="color-inherit font-normal">{description}</p>
        </a>
      </div>
      <img src={edit} alt="edit" className="w-[15px]" />
    </article>
  );
};

export default BookmarkComponent;
