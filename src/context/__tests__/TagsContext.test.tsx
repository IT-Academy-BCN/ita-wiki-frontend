import { render, screen, waitFor } from "@testing-library/react";
import { TagsProvider, useTags } from "../TagsContext";

import { getTags } from "../../api/endPointTags";
import { fetchTagsIdsByCategory } from "../../api/endPointTagsIdsByCategory";

import { Tag } from "../../types";

vi.mock("../../api/endPointTags");
vi.mock("../../api/endPointTagsIdsByCategory");

const mockTags: Tag[] = [
  {
    id: 1,
    name: "react",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "typescript",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

const mockTagsByCategory = {
  React: [1],
  Node: [2],
};

const TestComponent = () => {
  const { tags, getTagsByCategory } = useTags();

  return (
    <div>
      <div data-testid="tag-count">{tags.length}</div>
      <div data-testid="react-count">{getTagsByCategory("React").length}</div>
    </div>
  );
};

test("loads and provides tags and category-filtered tags", async () => {
  (getTags as vi.Mock).mockResolvedValue(mockTags);
  (fetchTagsIdsByCategory as vi.Mock).mockResolvedValue(mockTagsByCategory);

  render(
    <TagsProvider>
      <TestComponent />
    </TagsProvider>,
  );

  await waitFor(() => {
    expect(screen.getByTestId("tag-count").textContent).toBe("2");
    expect(screen.getByTestId("react-count").textContent).toBe("1");
  });
});
