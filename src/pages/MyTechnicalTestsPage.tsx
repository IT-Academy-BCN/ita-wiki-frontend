import TechnicalTestFilter from "../components/technical-test/TechnicalTestFilter";
import TechnicalTestList from "../components/technical-test/TechnicalTestList";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import Container from "../components/ui/Container";

function MyTechnicalTestsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    if (location.state?.successMessage && !toastShown.current) {
      toast.success(location.state.successMessage);
      toastShown.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <Container>
        <div className="flex flex-col md:flex-row">
          <TechnicalTestFilter />
          <TechnicalTestList />
        </div>
      </Container>
    </>
  );
}

export default MyTechnicalTestsPage;
