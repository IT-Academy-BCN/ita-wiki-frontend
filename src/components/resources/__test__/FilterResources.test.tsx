// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router";
// import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
// import { FilterResources } from "../FilterResources";
// import { themes } from "../../../data/themes";
// import { EnuResourceThemes, EnuResourceTypes } from "../../../enums";

// describe("FilterResources Component", () => {
//   let selectedTheme: (typeof themes)[number];
//   let selectedResourceTypes: string[];

//   let setSelectedTheme: ReturnType<typeof vi.fn>;
//   let setSelectedResourceTypes: ReturnType<typeof vi.fn>;

//   let resetTheme: Mock;

//   beforeEach(() => {
//     selectedTheme = themes[0];
//     selectedResourceTypes = [];

//     setSelectedTheme = vi.fn((theme: (typeof themes)[number]) => {
//       selectedTheme = theme;
//     });

//     setSelectedResourceTypes = vi.fn((newResourceTypes: string[]) => {
//       selectedResourceTypes = newResourceTypes;
//     });

//     resetTheme = vi.fn(() => {
//       selectedTheme = themes[0]; // Reset to first theme (usually "Todos")
//       selectedResourceTypes = []; // Reset to empty array
//     });
//   });

//   it("should render categories and types from filter.json", () => {
//     render(
//       <MemoryRouter>
//         <FilterResources
//           themes={[...Object.values(EnuResourceThemes)]}
//           resourceTypes={[...Object.values(EnuResourceTypes)]}
//           selectedTheme={selectedTheme}
//           setSelectedTheme={setSelectedTheme}
//           selectedResourceTypes={selectedResourceTypes}
//           setSelectedResourceTypes={setSelectedResourceTypes}
//           resetTheme={resetTheme}
//         />
//       </MemoryRouter>,
//     );

//     [...Object.values(EnuResourceThemes)].forEach((theme) => {
//       expect(screen.getByText(theme)).toBeInTheDocument();
//     });

//     [...Object.values(EnuResourceTypes)].forEach((type) => {
//       expect(screen.getByText(type)).toBeInTheDocument();
//     });
//   });

//   it("should update selected category when clicked", () => {
//     render(
//       <MemoryRouter>
//         <FilterResources
//           themes={[...Object.values(EnuResourceThemes)]}
//           resourceTypes={[...Object.values(EnuResourceTypes)]}
//           selectedTheme={selectedTheme}
//           setSelectedTheme={setSelectedTheme}
//           selectedResourceTypes={selectedResourceTypes}
//           setSelectedResourceTypes={setSelectedResourceTypes}
//           resetTheme={resetTheme}
//         />
//       </MemoryRouter>,
//     );

//     const eventCategory = screen.getByText("Eventos");
//     fireEvent.click(eventCategory);

//     expect(setSelectedTheme).toHaveBeenCalledWith("Eventos");
//   });

//   it("should toggle type checkboxes when clicked", () => {
//     render(
//       <MemoryRouter>
//         <FilterResources
//           themes={[...Object.values(EnuResourceThemes)]}
//           resourceTypes={[...Object.values(EnuResourceTypes)]}
//           selectedTheme={selectedTheme}
//           setSelectedTheme={setSelectedTheme}
//           selectedResourceTypes={selectedResourceTypes}
//           setSelectedResourceTypes={setSelectedResourceTypes}
//           resetTheme={resetTheme}
//         />
//       </MemoryRouter>,
//     );

//     const videoCheckbox = screen.queryByLabelText("Video") as HTMLInputElement;
//     fireEvent.click(videoCheckbox);

//     expect(setSelectedResourceTypes).toHaveBeenCalled();
//     expect(setSelectedResourceTypes).toHaveBeenCalledWith(["Video"]);
//   });
// });
