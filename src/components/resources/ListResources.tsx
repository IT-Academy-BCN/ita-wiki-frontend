import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { IntResource, TypTechnologyResource } from "../../types";

import { Resource } from "./Resource";
import { FilterResources } from "./FilterResources";

import filterData from "../../moock/filters.json";
interface ListResourceProps {
  resources: IntResource[];
  technology?: TypTechnologyResource;
}

export const ListResources: FC<ListResourceProps> = ({
  resources,
  technology,
}) => {
  const { categories, types } = filterData;

  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || categories[0];
  const initialTypes = searchParams.get("types")?.split(",") || [types[0]];

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (
      selectedTypes.length > 0 &&
      selectedTypes.some((type) => type.trim() !== "")
    ) {
      params.set("types", selectedTypes.join(","));
    }
    const queryString = params.toString();
    setSearchParams(queryString ? params : undefined);
  }, [selectedCategory, selectedTypes, setSearchParams]);

  return (
    resources && (
      <div className="mx-auto w-full grow lg:flex xl:px-2 gap-x-6 sm:bg-white lg:bg-transparent">
        <div className="flex-1 xl:flex bg-white sm:rounded-xl px-8 py-6">
          {/* Sidebar Filters (Visible on larger screens, on the left) */}
          <div className="hidden sm:block px-4 py-6 sm:px-6 lg:pr-8 lg:w-80 xl:shrink-0 xl:pr-6">
            <h2 className="text-2xl font-bold">Filtros</h2>
            <FilterResources
              categories={categories}
              types={types}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
            />
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <div className="flex justify-between items-center">
              <h2 className="py-4 text-4xl">Recursos {technology}</h2>
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
            </div>

            {/* Filters - Visible on mobile when toggled */}
            {showFilters && (
              <div className="sm:hidden mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold">Filtros</h2>
                <FilterResources
                  categories={categories}
                  types={types}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                />
              </div>
            )}

            <ul className="flex flex-col gap-2 mt-4">
              {resources.map((resource: IntResource) => (
                <Resource key={resource.id} resource={resource} />
              ))}
            </ul>
          </div>
        </div>

        <div className="shrink-0 lg:w-80 mt-6 sm:mt-0 space-y-6">
          <div className="bg-white sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6">
            Lista de lectura
          </div>
          <div className="bg-white sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6">
            Mis recursos
          </div>
        </div>
      </div>
    )
  );
};
