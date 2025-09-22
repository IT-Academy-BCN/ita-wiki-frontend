import { FC } from "react";
import { IntResource } from "../../types";
import { useResourcesFilters } from "../../context/ResourcesFiltersContext";
import { ResourcesFilters } from "./ResourcesFilters";
import { ResourcesList } from "./ResourcesList";
import FilterButton from "./FilterButton";
import Container from "../ui/Container";

interface ResourcesLayoutProps {
  resources: IntResource[];
  category?: string;
}

export const ResourcesLayout: FC<ResourcesLayoutProps> = ({
  resources,
  category,
}) => {
  const { showMobileFilters, setShowMobileFilters } = useResourcesFilters();

  return (
    <Container>
      <div className="flex flex-col gap-6 py-3 lg:gap-12 xl:gap-20 lg:flex-row">
        {/* Desktop Filters */}
        <ResourcesFilters isMobile={false} />
            
        {/* Main Content */}
        <div className="lg:flex-1" >
          <div className="flex justify-between items-center" >
            <h2 className="text-[26px] font-bold">Recursos {category || ""}</h2>

            {/* Mobile Filter Button */}
            <FilterButton
              setShowFilters={setShowMobileFilters}
              showFilters={showMobileFilters}
            />
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && <ResourcesFilters isMobile={true} />}

          {/* Resources List */}
          <ResourcesList resources={resources} category={category} />
        </div>
      </div>
    </Container>
  );
};
