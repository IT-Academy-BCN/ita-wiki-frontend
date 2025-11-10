import PageTitle from "../components/ui/PageTitle";
import CodeConnectFiltersComponent from "../components/code-connect/CodeConnectFiltersComponent";
import ProjectList from "../components/ui/projectList/ProjectList";
import { useNavigate } from "react-router";

const CodeConnectPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle title="Lista de proyectos Code Connect" />
      <div className="w-full px-4 pb-4 grow lg:flex-1 gap-x-6 sm:bg-white lg:bg-transparent">
        <div className="flex flex-col lg:flex-row w-full lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
          <div className="lg:flex-1 overflow-y-auto h-[calc(100vh-90px)] px-4 py-6 lg:pl-8 xl:pl-6">
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-[26px] font-bold text-left">Code Connect</h2>
            </div>
            <CodeConnectFiltersComponent />
            <button
              onClick={() => navigate("/codeconnect/create")}
              className="px-4 py-2 bg-primary text-white rounded-lg  h-fit hover:shadow-md cursor-pointer w-fit"
            >
              Afegir Code Connect
            </button>
            <ProjectList />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeConnectPage;
