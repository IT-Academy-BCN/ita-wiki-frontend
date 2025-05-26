// src/ui/TagsByCategory.tsx
import React from "react";

interface TagsByCategoryProps {
  category: string;
  tags: { [tagName: string]: number }; // <- corregido
}

const TagsByCategory: React.FC<TagsByCategoryProps> = ({ category, tags }) => {
  const tagNames = Object.keys(tags); // <- obtenemos solo los nombres

  //Testing
  console.log("tags: ");
  console.log(tagNames);

  return (
    <div>
      <h3 className="text-lg font-semibold">{category}</h3>
      <ul className="flex flex-wrap gap-2 mt-2">
        {tagNames.map((tag) => (
          <li key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsByCategory;
