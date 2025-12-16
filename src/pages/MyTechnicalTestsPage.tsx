import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

import TechnicalTestFilter from "../components/technical-test/TechnicalTestFilter";
import TechnicalTestList from "../components/technical-test/TechnicalTestList";
import Container from "../components/ui/Container";

type TechnicalTestsFiltersState = {
  languages: string[];
  years: string[];
  difficulties: string[];
};

function MyTechnicalTestsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);

  const [filters, setFilters] = useState<TechnicalTestsFiltersState>({
    languages: [],
    years: [],
    difficulties: [],
  });

  useEffect(() => {
    if (location.state?.successMessage && !toastShown.current) {
      toast.success(location.state.successMessage);
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <Container>
      <div className="flex flex-col md:flex-row">
        {}
        <TechnicalTestFilter onFiltersChange={setFilters} />

        {}
        <TechnicalTestList filters={filters} />
      </div>
    </Container>
  );
}

export default MyTechnicalTestsPage;
