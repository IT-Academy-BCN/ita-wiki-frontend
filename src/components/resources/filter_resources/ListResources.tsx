import React from "react";
import { FilterResources } from "./FilterResources";
import { IntResource } from "../../../types";
import { Resource } from "../Resource";
import { EnuCategories, EnuResourceTypes, EnuThemes } from "./filterOptions";
import { FilterProvider } from "../../../context/FilterCtxProvider";

interface ListResourceProps {
  resources: IntResource[];
  category?: EnuCategories;
}

export const ListResources: React.FC<ListResourceProps> = ({ resources, category }) => {
  return (
    <FilterProvider
      initialTheme={EnuThemes.Todos}
      initialResourceTypes={[...Object.values(EnuResourceTypes)]}
    >
      <>
        {/* Sidebar Filters (Visible on larger screens) */}
        <section className="hidden sm:block px-4 py-6 sm:px-6 lg:pr-8 lg:w-80 xl:shrink-0 xl:pr-6">
          <h2 className="text-xl md:text-[28px] font-bold">Filtros</h2>
          <FilterResources themes={Object.values(EnuThemes)} resourceTypes={Object.values(EnuResourceTypes)} />
        </section>

        {/* Main content: list of resources */}
        <section className="w-[100dvw] md:w-full flex flex-col py-4 gap-4 ">
          <article className="flex flex-col gap-4 md:flex-row justify-between items-center">
            <header className="w-full flex justify-between items-center px-4">
              <h2 className="text-xl md:text-[26px] font-bold">
                Recursos {category}
              </h2>
              {/* Aquí puedes agregar un botón para togglear filtros en móviles */}
            </header>
          </article>

          {/* Mobile filters section if applicable */}
          {/* ... Puedes incluir lógica condicional para mostrar filtros en mobile */}

          <ul className="flex flex-col px-4 gap-8 h-[75dvh] overflow-x-hidden overflow-y-auto">
            {resources.map((resource) => (
              <Resource key={resource.id} resource={resource} />
            ))}
          </ul>
        </section>
      </>
    </FilterProvider>
  );
};
