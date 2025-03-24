import { FC } from "react";
import { useResourceCtx } from "../../../hooks/resources/useResourcesCtx";
import { FilterResources } from "../../../components/resources/FilterResources";
import { Resource } from "../../../components/resources/Resource";
import { IntResource } from "../../../types";



export const ViewResourcesCategory: FC = () => {
  const {
    filteredResources,
    toggleFilter,
    showFilters,
    category
  } = useResourceCtx();

  return (
    filteredResources && (
      <>
        {/* Sidebar Filters (Visible on larger screens, on the left) */}
        <section className="hidden sm:block px-4 py-6 sm:px-6 lg:pr-8 lg:w-80 xl:shrink-0 xl:pr-6">
          <h2 className="text-xl md:text-[28px] font-bold">Filtros asdasda</h2>
          <FilterResources />
        </section>
        <section className="w-[100dvw] md:w-full flex flex-col py-4 gap-4 ">
          <article className="flex flex-col gap-4 md:flex-row justify-between items-center">
            <header className="w-full flex justify-between items-center px-4">
              <h2 className="col-start-1 col-end-4 text-xl md:text-[26px] font-bold">
                Recursos {category}
              </h2>
              <button
                className="sm:hidden bg-[#B91879] text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={toggleFilter}
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
            </header>
          </article>
          {/* Filters - Visible on mobile when toggled */}
          {showFilters && (
            <article className="sm:hidden mt-4 p-4 bg-gray-100 h-96 rounded-lg overflow-x-hidden overflow-y-auto">
              <h2 className="text-xl md:text-[28px] font-bold">Filtros</h2>
              <FilterResources />
            </article>
          )}

          <ul className="flex flex-col px-4 gap-8 h-[75dvh] overflow-x-hidden overflow-y-auto">
            {filteredResources.map((resource: IntResource) => (
              <Resource key={resource.id} resource={resource} />
            ))}
          </ul>
        </section>
      </>
    )
  );
};
