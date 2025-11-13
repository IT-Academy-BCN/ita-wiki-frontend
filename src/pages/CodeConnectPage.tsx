import PageTitle from "../components/ui/PageTitle";
import CodeConnectFiltersComponent from "../components/code-connect/CodeConnectFiltersComponent";
import ProjectList from "../components/ui/projectList/ProjectList";
import { useNavigate } from "react-router";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { useState } from "react";

const CodeConnectPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <>
      <PageTitle title="Llista de projectes Code Connect" />
      <div className="w-full px-4 pb-4 grow lg:flex-1 gap-x-6 sm:bg-white lg:bg-transparent">
        <div className="flex flex-col lg:flex-row w-full lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
          <div className="lg:flex-1 overflow-y-auto h-[calc(100vh-90px)] px-4 py-6 lg:pl-8 xl:pl-6">
            <div className="flex justify-between flex-wrap items-start">
              <h2 className="text-[26px] font-bold text-black text-left">
                Code Connect
              </h2>
              <div className="py-3 sm:py-0">
                <ButtonComponent
                  variant="primary"
                  onClick={() => navigate("/codeconnect/create")}
                >
                  Crear projecte
                </ButtonComponent>
              </div>
            </div>
            <p className="text-black py-5">
              Vull practicar com a developer de:
            </p>
            <CodeConnectFiltersComponent selected={filter} onChange={setFilter} />
            <ProjectList filter={filter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeConnectPage;
