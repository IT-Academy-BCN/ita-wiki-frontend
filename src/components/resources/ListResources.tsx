import { FC, useState } from "react";
import { IntResource } from "../../types";
import { Resource } from "./Resource";
import { FilterResources } from "./FilterResources";
import { categories } from "../../data/categories";
import { themes } from "../../data/themes";
import { resourceTypes } from "../../data/resourceTypes";
import { useResourceFilter } from "../../hooks/useResourceFilter";
import searchIcon from "../../assets/svg/search.svg";

interface ListResourceProps {
  resources: IntResource[];
  category?: keyof typeof categories;
}

export const ListResources: FC<ListResourceProps> = ({
  resources,
  category,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const {
    filteredResources,
    selectedTheme,
    setSelectedTheme,
    selectedResourceTypes,
    setSelectedResourceTypes,
    resetTheme,
  } = useResourceFilter({
    resources: resources || [],
    themes,
    resourceTypes,
  });



  return (
    resources && (
      <section className=" lg:flex xl:px-2 gap-x-6 sm:bg-white lg:bg-transparent">
        <article className="flex flex-col lg:flex-row lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
          {/* Sidebar Filters (Visible on larger screens, on the left) */}
          <section className="hidden sm:block px-4 py-6 sm:px-6 lg:pr-8 lg:w-80 xl:shrink-0 xl:pr-6">
            <h2 className="text-[26px] font-bold">Filtros</h2>
            <FilterResources
              themes={[...themes]}
              resourceTypes={[...resourceTypes]}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedResourceTypes={selectedResourceTypes}
              setSelectedResourceTypes={setSelectedResourceTypes}
              resetTheme={resetTheme}
            />
          </section>
          <section className="lg:flex-1 px-4 py-6 lg:pl-8 xl:pl-6">
            <article className="flex justify-between items-center">
              <header className="w-full flex items-center gap-2 justify-between">
                <h2 className="text-[26px] font-bold">
                  Recursos {String(category) || ""}
                </h2>
                <article className="relative inline-flex cursor-pointer">
                  <input
                    type="text"
                    placeholder="Buscar recurso"
                    className="bg-white pl-10 pr-4 py-2 border border-white font-semibold rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#808080]"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]">
                    <svg
                      xmlns={searchIcon}
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.9 14.32a8 8 0 111.42-1.42l4.83 4.83a1 1 0 01-1.42 1.42l-4.83-4.83zM8 14a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </article>
              </header>
              {/* Filter Button (Mobile only) */}
              <button
                className="sm:hidden bg-[#B91879] text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filtrar</span>
                {showFilters ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </button>
            </article>
            {/* Filters - Visible on mobile when toggled */}
            {showFilters && (
              <article className="sm:hidden mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold">Filtros</h2>
                <FilterResources
                  themes={themes}
                  resourceTypes={resourceTypes as readonly string[]}
                  selectedTheme={selectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  selectedResourceTypes={selectedResourceTypes}
                  setSelectedResourceTypes={setSelectedResourceTypes}
                  resetTheme={resetTheme}
                />
              </article>
            )}
            <ul className="flex flex-col gap-2 py-8">
              {filteredResources.map((resource: IntResource) => (
                <Resource key={resource.id} resource={resource} />
              ))}
            </ul>
          </section>
        </article>
      </section>
    )
  );
};
