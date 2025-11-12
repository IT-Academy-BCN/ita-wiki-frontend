import TechnicalTestFilter from "../components/technical-test/TechnicalTestFilter";
import TechnicalTestList from "../components/technical-test/TechnicalTestList";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

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
      <div className="flex gap-4 bg-white rounded-lg p-4 m-4 shadow-xl justify-between">
        <TechnicalTestFilter />
        <TechnicalTestList />
      </div>
      <div className="m-4">
        <button
          onClick={() => navigate("/resources/technical-test/create")}
          className="px-4 py-2 bg-primary text-white rounded-lg  h-fit hover:shadow-md cursor-pointer w-fit"
        >
          Crear prova
        </button>
      </div>
    </>
  );
}

export default MyTechnicalTestsPage;
