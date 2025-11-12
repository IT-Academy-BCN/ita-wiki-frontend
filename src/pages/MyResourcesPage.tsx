import { FC } from "react";
import { PenSquare } from "lucide-react";

import { useUserContext } from "../context/UserContext";

import { ListMyResources } from "../components/resources/ListMyResources";
import { useResources } from "../context/ResourcesContext";
import PageTitle from "../components/ui/PageTitle";

const MyResourcesPage: FC = () => {
  const { resources, isLoading } = useResources();
  const { user } = useUserContext();

  const myResources = resources.filter(
    (resource) => resource.github_id === user?.id,
  );

  return (
    <>
      <PageTitle title="Recursos que has creat" />
      {isLoading ? (
        <div className="w-full max-w-screen-xl px-4 mx-auto py-10 text-center">
          Obtenint els recursos...
        </div>
      ) : (
        <div className="w-full max-w-screen-xl px-4 mx-auto grow lg:flex-1 gap-x-6 sm:bg-white lg:bg-transparent">
          <div className="flex flex-col lg:flex-row lg:flex-grow lg:overflow-y-auto bg-white lg:rounded-xl px-4 lg:px-8 py-4 sm:py-6">
            <div className="lg:flex-1 overflow-y-auto h-[calc(100vh-90px)] px-4 py-6 lg:pl-8 xl:pl-6">
              <div className="flex flex-col justify-between items-center">
                <h2 className="text-[26px] font-bold text-center">
                  Recursos que has creat
                </h2>

                {myResources.length > 0 ? (
                  <ListMyResources myResources={myResources} />
                ) : (
                  <div className="w-full bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
                    <div className="flex items-center">
                      <PenSquare className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-yellow-800">
                          No has creat cap recurs
                        </h3>
                        <p className="text-yellow-700 mt-1">
                          Crea recursos per veure'ls aquí
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyResourcesPage;
